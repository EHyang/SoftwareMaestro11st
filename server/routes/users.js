var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
// var serviceAccount = require("../../config/nice-dotda-firebase-adminsdk-36j2q-87fd7c2ee6.json");
var config = require('config');
var serviceAccount = config.get('firebaseSDK')

console.debug('users router init');
admin.initializeApp({ // FCM 연동 (테스트)
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nice-dotda.firebaseio.com"
});

const models = require('../models');
const Sequelize = require('sequelize');
const { sequelize } = require('../models');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/token', function(req, res, next){ // 유저 기기 토큰 받기
  if(!req.body.token){
    console.debug('token not received');
    res.sendStatus(400);
    return;
  }
  console.debug('received token');
  console.debug(req.body);
  req.session.token=req.body.token; // 토큰 세션에 저장
  res.sendStatus(200);
})

router.get('/test-send', function(req, res, next){ // 유저 기기 토큰으로 알림 보내기(테스트)
  console.debug('testing-send');
  if(!req.session.token) {
    console.debug('no token.');
    res.sendStatus(400);
    return;
  }
  const registrationToken = req.session.token;  // 세션에서 토큰 가져오기
  console.debug(registrationToken);

  const message_notification = {  // 알림 데이터 생성
    notification: {
       title: '확진자 접촉 알림',
       body: '당신은 3차 확진자와 접촉하셨습니다'
           }
    };
    
  setTimeout(()=>{
    const notification_options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
  
    const options =  notification_options
    console.debug('send message!');
    admin.messaging().sendToDevice(registrationToken
      , message_notification
      , options)  // FCM으로 알림 보내기
    .then(response => {

      res.status(200).send("Notification sent successfully")
     
    })
    .catch( error => {
        console.log(error);
    });
  }, 3000);
})

  console.debug('login');
  if(!req.body.google_id){
    console.error('google id is null');
    res.sendStatus(400);
  }

  const preUser = await models.User.findOne({
    where:{
      mac: req.body.mac
    }
  })

  if(preUser){
    console.info('mac already exists. checking whether this is a new user');
    if(!preUser.google_id){
      console.info('this is a new user');
      await preUser.update({
        google_id: req.body.google_id
      })

      if(!preUser.google_id){
        console.error('what?? this is no way.')
      }
      res.sendStatus(200);
      // TODO: check that user model is fully configured 
    } else {
      console.debug('google id is also exists. inserting new record');
    }
  }
 
  models.User
  .findOrCreate({where: {google_id: req.body.google_id,
  mac: req.body.mac}})
  .then(([user, created]) => {
    console.log(user.get({
      plain: true
    }))
    if(created==false){
      // user already exists. doesn't matter.
    }

    req.session.user=user;

    console.log(created);
    res.sendStatus(200);
  }).catch(function(error){
    
    console.error(error);
    res.sendStatus(400);
  })
})

router.post('/state', async function(req, res, next){ // 확진자 신고
  console.debug('marking you as infected');
  
  if(!req.body.key=='secretPassKey'){
    console.error('not allowed');
    res.sendStatus(404);
  }

  let t = await sequelize.transaction();
  let targetUser;
  try {
    targetUser = await models.User
    .findOne({ where: {
      // mac: req.body.mac
        mac: req.body.target_mac
      }, transaction:t})
    console.debug(`targetUser: ${targetUser}`);
    if(targetUser){
      console.debug('found target infected user:');
      // console.debug(targetUser);
    
      const updatedUser = await targetUser.update({
        state: req.body.target_state
      }, {transaction:t})
      // req.session.user=updatedUser;
      console.debug('state update success');
      
      visited={};
      if(req.body.target_state==2){
        await propagateContact(req.body.target_mac, req.body.target_state, 1, t);
      }

      t.commit();
      res.sendStatus(204);

    } else throw Error('user not found');

  } catch (error) {
    console.error('state marking failed. reverting');
    console.error(error);
    t.rollback();
  }
  

})

})
      req.session.user=updatedUser;
      console.debug('update success');

      res.sendStatus(204)
    }
})

module.exports = router;
