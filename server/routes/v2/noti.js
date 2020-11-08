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

2020-11-05 현우
- fcm key config로 옮김
*/

// TODO: v3에 합치기
// 고려사항(합칠부분):
// - 사용 테이블
// - propagateContacts 접촉 전파 함수

var express = require('express');
var db = require('@db');
var router = express.Router();
var config = require('config');

var FCM = require('fcm-node');
var serverKey = config.get('FCM_KEY');
var fcm = new FCM(serverKey);

var visited = {};
let globalContacts = new Set();

function logger(msg){
  // console.log(msg);
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
    // logger(`source my_key:::: ${sourceID}`);

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
  
    logger('start reduce');
    var uniq = arr.reduce(function(a, b) {
      logger(a,b);
      if (a.indexOf(b) < 0 && !visited[b]) a.push(b);
      logger(a,b);
      return a;
    }, []);

    if(uniq.length == 0){
      logger('contact list is empty. aborting');
      return;
    }
    
    uniq.forEach(element => {
      if(!visited[element]){
        globalContacts.add(element);
      }
    });
    logger('end reduce');
    logger(uniq);
    // globalContacts = globalContacts.add(...uniq); // concat is NOT inplace
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
        // logger(rows);
        resolve();
      });

    })

    await q3;

    const q4 = new Promise((resolve, reject) => {
      var select_key = 'select my_key from members where my_key in ( ? )';
      db.mysql.query(select_key, [uniq], async function(err, rows, fields) {
        logger("여기");
        logger(rows);
        const tokens=[];
        const errors=[];
        if (err) {
          logger(err);
          return reject(err);
        } else {
          for (var i = 0; i < rows.length; ++i) {
            logger(rows[i]['my_key']);
            tokens.push(rows[i]['my_key']);
            var message = {
              to: rows[i]['my_key'],
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
            await propagateContacts(rows[i]['my_key'], degree)
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

router.get('/', async function(req, res) {
  logger(req.query.my_key + " noti");
  var my_key = req.query.my_key;
  contacts = [];
  visited = {};
  let tokens = [];
  
  await propagateContacts(my_key, 0);

  logger('propagation DONE');

  res.json({res: 0});
});


module.exports = router;
