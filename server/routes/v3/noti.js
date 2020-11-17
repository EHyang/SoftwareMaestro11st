/**
 * 2020-10-07 태양
 * - 코드 정리 필요
 * 
 * 2020-10-23 태양
 * - 코드 정리, log 삭제
 * 
 * 2020-10-30 태양
 * - 접촉자에게 알림보내기전에 상태 업데이트
 * - 접촉자에게 알림과 동시에 접촉시간 전송(진행중)
 * 
 * 2020-11-03 현우
 * - v2 api 추가 버전 병합
 * - dbconfig 로드 스크립트 사용
 * - logger 함수 사용
 * 
 * 2020-11-05 현우
 * - fcm key config로 옮김
 * 
 * 2020-11-16
 * 태양
 * - 알림에 데이터 추가 및 수정
 * 
 * 현우
 * - 시간 데이터 포멧 설정
 */

var express = require('express');
var db = require('@db');
var router = express.Router();
var config = require('config');
var moment = require('moment');

var FCM = require('fcm-node');
var serverKey = config.get('FCM_KEY');
var fcm = new FCM(serverKey);

var visited = {};
let globalContacts = new Set();

function logger(msg) {
   console.log(msg);
}

async function propagateContacts(target, degree) {
  // const sourceID = target.my_key;
  const my_key = target;
  const sourceID = target;
  degree = degree + 1;

  if (visited[sourceID]) {
    console.info('already visited: ');
    return;
  }
  logger(`propagating contacts from ${sourceID}`);
  visited[sourceID] = 1;

  try {
    // logger(`source token:::: ${sourceID}`);

    var select_sql = 'select distinct my_key, scan_time from scan where scan_key = ?';
    var arr = [];
    var time = [];

    /////////// scan1 
    const q1 = new Promise((resolve, reject) => {
      db.mysql.query(select_sql, my_key, (err, rows, fields) => {
        if (err) {
          return reject("db", `${err.message}`);
        }
        logger(rows);

        for (var i = 0; i < rows.length; ++i) {
          logger('appending arr with scan_key');
          logger(rows[i]["my_key"]);
          logger(rows[i]["scan_time"]);
          arr.push(rows[i]["my_key"]);
          time.push(moment(rows[i]["scan_time"]).format('YYYY-MM-DD HH:mm:ss'))
        }
        logger('q1 done');
        resolve();
      });
    });

    await q1;

    arr.forEach(element => {
      if (!visited[element]) {
        globalContacts.add(element);
      }
    });

    // globalContacts = globalContacts.add(...uniq); // concat is NOT inplace
    logger('global contacts:d');
    logger(globalContacts);

    const q3 = new Promise((resolve, reject) => {
      var now = new Date();
      console.log(now);
      var update_states = `update members set state=1,degree=${degree},origin='${target}',isolation='${now}' where my_key in (?)`;

      logger('debug');
      logger(update_states);
      db.mysql.query(update_states, [arr], function (err, rows, fields) {
        if (err) {
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
      db.mysql.query(select_token, [arr], async function (err, rows, fields) {
        logger("여기");
        logger(rows);
        const tokens = [];
        const errors = [];
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

              // notification: {
              //     title: 'Noti Test',
              //     body: 'zbzb'
              // }
              data: {
                title: 'Push Test',
                body: 'You had contacted with infected person',
                contacted_time: time[i]
              }
            };
            fcm.send(message, function (err, response) {
              if (err) {
                logger(err);
                logger("에러나써");
                errors.push(err);
              } else {
                logger("잘가써");
              }
            });
            //await propagateContacts(rows[i]['token'], degree)
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

router.get('/', async function (req, res) {
  logger(req.query.my_key + " noti");
  var my_key = req.query.my_key;
  var degree_sql = "select degree from members where my_key = ?";
  contacts = [];
  visited = {};
  let tokens = [];
  var my_degree;

  /* TODO : 내 차수 가져 오기 */
  const query = new Promise((resolve, reject) => {
    db.mysql.query(degree_sql, my_key, function (err, rows) {
      if (err)
        logger(err);
      else {
        logger(rows[0]);
        my_degree = rows[0]['degree'];
        resolve();
      }
    });
  });

  await query;

  logger(my_degree)
  await propagateContacts(my_key, my_degree);

  logger('propagation DONE');

  tokens = globalContacts;

  logger(tokens);

  res.json({
    res: 0
  });
});


module.exports = router;
