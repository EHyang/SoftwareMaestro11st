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

var visited={};

router.get('/', function(req, res, next) {
  console.log('refreshing user session');
  console.debug(req.session);
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

router.get('/my', async function(req, res, next){ // 자신의 정보 확인
  console.debug('refreshing user session');

  const t = await sequelize.transaction();
  
  try {
    const user = await models.User.findOne({where:{
      token: req.session.token
    }, transaction:t});
    
    t.commit();
    if(user){
      req.session.user=user;
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    t.rollback();
  }
})

router.post('/login', async function(req, res, next) {  // 로그인 
  console.debug('login');
  if(!req.body.google_id){
    console.error('google id is null');
    res.sendStatus(400);
  }
  
  const t = await sequelize.transaction();
  try {
    const preUser = await models.User.findOne({
      where:{
        token: req.body.token
      }, transaction:t
    })
  
    if(preUser){  // 이미 유저 모델이 있는 경우
      console.info('token already exists. checking whether this is a new user');
      if(!preUser.google_id){
        console.info('this is a new user');
        await preUser.update({
          google_id: req.body.google_id,
          scan_id: 'tmpscanid1112323'
        }, {transaction:t})

        // TODO: refactor
        // warning: functional duplicate with below!
        req.session.user=preUser;
        req.session.token=preUser.token;

        console.log(`user login success!`);

        console.debug('we now need to check if this new user has already contact');
        
        if(!preUser.google_id){
          console.error('what?? this is no way.')
        }
        t.commit();
        // res.sendStatus(200);
        res.json({res: 'thisisyourkeyyeah'});
        // TODO: check that user model is fully configured 
        return;
      } else {
        console.debug('google id is also exists. inserting as a new record');
      }
    }
   
    models.User
    .findOrCreate({where: {google_id: req.body.google_id, //유저 검색 또는 생성
    token: req.body.token, scan_id: 'testscanid'}, transaction:t})
    .then(([user, created]) => {
      console.log(user.get({
        plain: true
      }))
      if(created==false){
        // user already exists. doesn't matter.
      }
  
      // warning: functional duplicate with above!
      req.session.user=user;
      req.session.token=user.token;
  
      console.log(`user login success!`);
      t.commit();
      //res.sendStatus(200);
      res.send({res:user.scan_id});
    }).catch(function(error){
      
      console.error(error);
      throw Error(error);
    })
  } catch (error) {
    console.error(error);
    t.rollback();
    res.sendStatus(400);
  }
})

async function propagateContact(sourcetoken, state, level=0, transaction){  // 접촉 전파
  if(visited[sourcetoken]){
    console.info('already visited: ');
    return;
  }
  console.debug(`propagating contacts from ${sourcetoken}`);
  visited[sourcetoken]=1;
  let contacts;

  try {
    // console.debug(`source token:::: ${sourcetoken}`);
    contacts = await models.Scan.findAll({where:{
      my_token:sourcetoken
    }, transaction:transaction});
    
    if(!contacts){
      console.error('something happened. contacts is null!!');
    }

    for (var i=0;i<contacts.length;i++) {
      const contact=contacts[i];
      console.debug('scan token::::');
      
      const user=await models.User.findOne({where:{
        token: contact.scan_token
      }, transaction:transaction});

      if(user){
        console.debug('user found : ', user);

        console.debug('CONTACTUSER of scan_token: ' + contact.scan_token);
        const updatedUser = await user.update({
          state:1
        }, {transaction:transaction});
  
        if(updatedUser){
          console.debug('User updated!!!');
          propagateContact(updatedUser.token, state, level+1);
        }

      } else {
        console.debug('user not found.');
      }
    
      // await t.commit();
    // } catch (error) {
    //   console.error(error);
    //   await t.rollback();
    // }
    }
    
  } catch (error) {
    console.error(error);
    await transaction.rollback();
  }
  // contacts.forEach(async (element) => {
  // });
  
  console.debug(`found ${contacts.length} contacts`);
}

router.post('/state', async function(req, res, next){ // 확진자 신고
  console.debug('marking you as infected');
  
  if(!req.body.token=='secretPasstoken'){
    console.error('not allowed');
    res.sendStatus(404);
  }

  let t = await sequelize.transaction();
  let targetUser;
  try {
    targetUser = await models.User
      .findOne({ where: {
        // token: req.body.token
        token: req.body.target_token
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
        await propagateContact(req.body.target_token, req.body.target_state, 1, t);
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

router.post('/drop', async function(req, res, next){
  console.debug('dropping everything');
  
  if(!req.body.token=='secretPasstoken'){
    console.error('not allowed');
    res.sendStatus(404);
  }
  
  sequelize.drop();
  res.sendStatus(200);
})

router.get('/sync', async function(req, res, next){
  console.info('syncing scan data with server...');
  res.sendStatus(404);
})

router.get('/test', async (req,res,next)=>{
  console.log('testing');

  let users;
  let vals2='token2';

  const t = await sequelize.transaction();
  
  try {

    users = await models.User.findAll({where:{
      token:vals2
    }}, {transaction: t});

    console.log(users);

    t.commit();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    t.rollback();
  }
})

router.get('/test2', async(req,res,next)=>{
  console.debug('TEST2');
  const t = await sequelize.transaction();
  try {
    const user=await models.User.findOne({where:{
      token: 'token2'
    }}, {transaction:t});
    // console.debug(user);
    t.commit();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
