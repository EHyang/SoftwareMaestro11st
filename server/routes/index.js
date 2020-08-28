var express = require('express');
var router = express.Router();

var admin = require('firebase-admin');
// var serviceAccount = require("../../config/nice-dotda-firebase-adminsdk-36j2q-87fd7c2ee6.json");
var config = require('config');
var serviceAccount = config.get('firebaseSDK');
var { encryptStringWithRsaPublicKey } = require('../util');
var jwt = require('jsonwebtoken');

console.debug('users router init');
// admin.initializeApp({ // FCM 연동 (테스트)
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nice-dotda.firebaseio.com"
// });

const models = require('../models');
const Sequelize = require('sequelize');
const { sequelize } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res, next) {  // 로그인 
  console.debug('login');
  if(!req.body.google_id){
    console.error('google id is null');
    res.sendStatus(400);
  }

  if(!req.body.token){
    console.error('user token is null');
    res.sendStatus(400);
  }

  //TODO: Use proper scan_id!!
  req.body.scan_id=req.body.google_id;
  
  const t = await sequelize.transaction();
  try {
    const preUser = await models.User.findOne({
      where:{
        scan_id: req.body.scan_id
      }, transaction:t
    })
  
    if(preUser){  // 이미 유저 모델이 있는 경우
      console.info('token already exists. checking whether this is a new user');
      if(!preUser.google_id){
        console.info('this is a new user');
        await preUser.update({
          google_id: req.body.google_id,
          token: req.body.token,
          scan_id: req.body.google_id
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
        // res.cookie("user", jwtToken)
        res.json({res: preUser.scan_id});
        // TODO: check that user model is fully configured 
        return;
      } else {
        console.debug('google id is also exists. inserting as a new record');
      }
    }
   
    models.User
    .findOrCreate({where: {
      google_id: req.body.google_id, //유저 검색 또는 생성
      token: req.body.token, 
      scan_id: req.body.google_id}, transaction:t})
    .then(([user, created]) => {
      console.log(user.get({
        plain: true
      }))
      if(created==false){
        // user already exists. doesn't matter.
      }
      user.id=user.scan_id;
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


router.post('/input', async function(req, res, next){  // 스캔 정보 전송
  console.debug('bulk creation started');
  
  // let jwtok = req.cookies.user;

  // let decoded = jwt.verify(jwtok, config.secret);
  // if(decoded){
  //   res.send("권한이 있어서 API 수행 가능")
  // }
  // else{
  //   res.send("권한이 없습니다.")
  // }

  // if(!req.session.user.id){
  //   console.error('creation fail. please login first');
  //   res.sendStatus('400');
  //   return;
  // }

  console.debug('req.body:');
  console.debug(req.body);

  var scans=req.body;

  //var parsed = 

  scans.forEach(scan => {
    console.debug('scan', scan);
    scan.my_id=scan.my_key;
    scan.scan_id=scan.scan_key;
    scan.scan_time=scan.scan_time;
    // scan=JSON.parse(scan, function(k, v) {
    //   if (k === "my_key") 
    //       this.my_id = v;
    //   else if (k === "scan_key")
    //       this.scan_id = v;
    //   else if(k=="scan_time")
    //       this.scan_time = v;
    //   else return v;
    // });
    // scan.my_id=req.session.user.scan_id
  });
  
  console.debug('request scan data:');
  console.debug(scans);
  const t = await sequelize.transaction();
  try {
    const createdScans = await models.Scan
      .bulkCreate(
        scans, {transaction: t}
      );
    
    if(createdScans.length>0){
      console.debug('scans create success');
      console.debug(`scans create length: ${createdScans.length}`);

      await Promise.all(createdScans.map(async (scan) => {  // 스캔 접촉 비동기 동시 실행
        console.debug(`scan: ${scan}`)
        const user = await models.User.findOrCreate({where: {
          scan_id: scan.scan_id
        }, transaction:t});
        console.debug(`user: ${user}`);
      }))
      
      t.commit();
      //res.sendStatus(201);
      console.debug('save success');
      res.json({res:0});
    } else {
      throw Error('invalid scans');
    }

  } catch (error) {
    console.error(error);
    t.rollback();
    res.sendStatus(400);
  }
})


router.post('/confirmed', async function(req, res, next){ // 확진자 신고
  console.debug('marking you as infected');
  
  // if(!req.body.key=='secretPasstoken'){
  //   console.error('not allowed');
  //   res.sendStatus(404);
  //   return;
  // }

  let t = await sequelize.transaction();
  let targetUser;
  try {
    targetUser = await models.User
      .findOne({ where: {
        // token: req.body.token
        scan_id: req.body.my_key
      }, transaction:t})
    console.debug(`targetUser: ${targetUser}`);
    if(targetUser){
      console.debug('found target infected user:');
      // console.debug(targetUser);

      const updatedUser = await targetUser.update({
        state: 2
      }, {transaction:t})
      // req.session.user=updatedUser;
      console.debug('state update success');
      
      visited={};
      if(2==2){
        await findAllContacts(t);
        // await propagateContact(targetUser.scan_id, 2, 1, t);
      }

      t.commit();
      //res.sendStatus(204);
      res.json({res:0});

    } else throw Error('user not found');

  } catch (error) {
    console.error('state marking failed. reverting');
    console.error(error);
    t.rollback();
    res.sendStatus(400);
  }

})

async function sendPush(token){
  
  const registrationToken = token;  // 세션에서 토큰 가져오기
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
}

// 모든 계정에 컨택 검사
async function findAllContacts(transaction){
  //let transaction = await sequelize.transaction();
  try {
    // console.debug(`source token:::: ${sourceID}`);
    contacts = await models.Scan.findAll({transaction:transaction});

    if(!contacts){
      console.error('something happened. contacts is null!!');
    }

    for (var i=0;i<contacts.length;i++) {
      const contact=contacts[i];
      console.debug('scan token::::');

      const userA=await models.User.findOne({where:{
        scan_id: contact.my_id
      }, transaction:transaction});
      
      const userB=await models.User.findOne({where:{
        scan_id: contact.scan_id
      }, transaction:transaction});
      
      if(userA && userB){
        if(userA.state==2){
          console.debug('sending to user ', userB);
          userB.state=1;
          userB.update({
            state:1
          }, {transaction:transaction});
          if(userB.token){
            sendPush(userB.token);
          }
        }
        if(userB.state==2){
          console.debug('sending to user ', userA);
          userA.state=1;
          userA.update({
            state:1
          }, {transaction:transaction});
          if(userA.token){
            sendPush(userA.token);
          }
        }
      }

    }
    
  } catch (error) {
    console.error(error);
    await transaction.rollback();
  }
  // contacts.forEach(async (element) => {
  // });
  
  console.debug(`found ${contacts.length} contacts`);
}

async function propagateContact(sourceID, state, level=0, transaction){  // 접촉 전파
  if(visited[sourceID]){
    console.info('already visited: ');
    return;
  }
  console.debug(`propagating contacts from ${sourceID}`);
  visited[sourceID]=1;
  let contacts;

  try {
    // console.debug(`source token:::: ${sourceID}`);
    contacts = await models.Scan.findAll({where:{
      my_id:sourceID
    }, transaction:transaction});
    
    if(!contacts){
      console.error('something happened. contacts is null!!');
    }

    for (var i=0;i<contacts.length;i++) {
      const contact=contacts[i];
      console.debug('scan token::::');
      
      const user=await models.User.findOne({where:{
        scan_id: contact.scan_id
      }, transaction:transaction});

      if(user){
        console.debug('user found : ', user);

        console.debug('CONTACTUSER of scan_token: ' + contact.scan_token);
        const updatedUser = await user.update({
          state:1
        }, {transaction:transaction});
  
        if(updatedUser){
          console.debug('User updated!!!');
          propagateContact(updatedUser.scan_id, state, level+1);
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

// 읽지 않은 유저에게도 전파 방법.
// 여러 기기 가진 경우 푸쉬 방법
// 접촉한 후 나중에 로그인한 경우 알림


module.exports = router;
