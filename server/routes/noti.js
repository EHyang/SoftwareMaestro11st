/*
2020-10-07 태양
코드 정리 필요

2020-10-23 태양
코드 정리, log 삭제

2020-10-30 태양
- 접촉자에게 알림보내기전에 상태 업데이트
- 접촉자에게 알림과 동시에 접촉시간 전송(진행중)

2020-11-03 현우
- v2 api 추가 버전 병합
- dbconfig 로드 스크립트 사용
- logger 함수 사용

*/

var express = require('express');
var db = require('../dbconfig-load');
var router = express.Router();

var FCM = require('fcm-node');
// TODO: remove server key from source code!
var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
var fcm = new FCM(serverKey);

var visited = {};
let globalContacts = [];

function logger(msg){
  //console.log(msg);
}

async function propagateContacts(target, degree){
  // const sourceID = target.my_key;
  const my_key = target;
  const sourceID = target;
  degree = degree+1;

  if(visited[sourceID]){
    console.info('already visited: ');
    return;
  }
  logger(`propagating contacts from ${sourceID}`);
  visited[sourceID]=1;

  try {
    // logger(`source token:::: ${sourceID}`);

    var select_scan = 'select distinct scan_key from scan where my_key = ?';
    var select_my = 'select distinct my_key from scan where scan_key = ?';
    var arr = [];

    /////////// scan1 
    const q1 = new Promise((resolve, reject) => {
      db.mysql.query(select_scan, my_key, (err, rows, fields) => {
        if(err){
          return reject("db", `${err.message}`);
        }
        logger(rows);
           
        for (var i = 0; i < rows.length; ++i) {
          logger('appending arr with scan_key');
          logger(rows[i]["scan_key"]);
          arr.push(rows[i]["scan_key"]);
        }
        logger('q1 done');
        resolve();
      });
    });
    
    const q2 = new Promise((resolve, reject)=>{
      db.mysql.query(select_my, my_key, function(err, rows, fields){
        if(err){
          return reject(err);
        }

        for (var i = 0; i < rows.length; ++i) {
          logger('appending arr with my_key');
          logger(rows[i]["my_key"]);
          arr.push(rows[i]["my_key"]);
        }
        
        logger('q2 done');
        resolve();
      })
    })

    await Promise.all([q1, q2]);
  
    var uniq = arr.reduce(function(a, b) {
      logger(a,b);
      if (a.indexOf(b) < 0) a.push(b);
      logger(a,b);
      return a;
    }, []);

    if(uniq.length == 0){
      logger('contact list is empty. aborting');
      return;
    }

    globalContacts = globalContacts.concat(uniq); // concat is NOT inplace
    logger('global contacts:d');
    logger(globalContacts);

    const q3 = new Promise((resolve, reject)=>{
      var update_states = `update members set state=1,degree=${degree},origin='${target}' where my_key in ( ? )`;

      logger('debug');
      logger(update_states);
      db.mysql.query(update_states, [uniq], function(err, rows, fields){
        if(err){
          return reject(err);
        }
        logger('UPDATE DONE!');
        logger(rows);
        resolve();
      });

    })

    await q3;

    const q4 = new Promise((resolve, reject) => {
      var select_token = 'select token from members where my_key in ( ? )';
      db.mysql.query(select_token, [uniq], async function(err, rows, fields) {
        logger("여기");
        logger(rows);
        const tokens=[];
        const errors=[];
        if (err) {
          logger(err);
          return reject(err);
        } else {
          for (var i = 0; i < rows.length; ++i) {
            logger(rows[i]['token']);
            tokens.push(rows[i]['token']);
            var message = {
              to: rows[i]['token'],
              collapse_key: 'dev',

              notification: {
                title: 'hello',
                body: 'Hi there~'
              }
            };
            fcm.send(message, function(err, response) {
              if (err) {
                logger(err);
                logger("에러나써");
                errors.push(err);
              } else {
                logger("잘가써");
              }
            });
            await propagateContacts(rows[i]['token'], degree)
          }
        }

        resolve();
      });
    })

    await q4;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}

router.get('/', function(req, res) {
  console.log(req.query.my_key + " send noti");
  var infect = req.query.my_key;

  var select_scan = 'select distinct scan_key from scan where my_key = ?';
  var select_my = 'select distinct my_key from scan where scan_key = ?';
  var arr = [];
  db.mysql.query(select_scan, infect, function(err, rows, fields) {
    if (err) {
      logger(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["scan_key"]);
      }
    }
  });
  db.mysql.query(select_my, infect, function(err, rows, fields) {
    if (err) {
      logger(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["my_key"]);
      }
    }
    //console.log(arr);

    var uniq = arr.reduce(function(a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);
    
    if(uniq[0]=='undefined'){
      uniq=uniq.splice(1);
    }
    
    logger(uniq);
    logger(uniq);
    var select_token = 'select token from members where my_key = ?';
    select_token = 'select * from members';

    //console.log(uniq);

    var select_token = 'select token from testmembers where my_key = ?';

    var update_state = 'update testmembers set state = 1 where my_key = ?';

    var select_time = "select scan_time from scan where (my_key = ? and scan_key = ?) or (my_key = ? and scan_key = ?) order by scan_time desc limit 1";
    
    db.mysql.query(update_state, uniq, function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("update state success");
      }
    });

    db.mysql.query(select_token, uniq, function(err, rows, fields) {
    //  console.log("여기");
      if (err) {
        logger(err);
      } else {
        for (var i = 0; i < rows.length; ++i) {
          logger(rows[i]['token']);
          tokens.push(rows[i]['token']);
          var message = {
            to: rows[i]['token'],
            collapse_key: 'dev',

            notification: {
              title: 'test',
              body: 'FCM noti test'
            }//,
            //data: {

            //}
          };
          fcm.send(message, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log("send message success");
            }
          });
        }
      }
      if(errors){
        console.error('error');
        res.json({res:-1, errors, tokens});
      }else {
        res.json({res:0, tokens});
      }
    });
  });
});

router.get('/v2', async function(req, res) {
  logger(req.query.my_key + " noti");
  var my_key = req.query.my_key;
  contacts = [];
  visited = {};
  let tokens = [];
  
  await propagateContacts(my_key, 0);

  logger('propagation DONE');

  tokens=globalContacts;

  logger(tokens);

  res.json({res: 0});
});


module.exports = router;
