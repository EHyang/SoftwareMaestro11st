/*
2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- v2 api 추가 버전 병합
- dbconfig 로드 스크립트 사용
- members 테이블 사용
*/

var express = require('express');
var db = require('@db');
var FCM = require('fcm-node');

var router = express.Router();

router.post('/cancel', function(req, res, next) {
  // console.log(req.body);
  var my_key = req.body.my_key;
  var update_sql = 'update members set state = 0,degree=0 where my_key = ?';
  db.mysql.query(update_sql, my_key, function(err, result) {
    if (err) {
      // console.log(err);
      res.json({'res':'0'});
    }
    res.json({'res':'1'});
  });

});

router.post('/', function(req, res, next) {
  // console.log('call confirm!');
  var my_key = req.body.my_key;
  var update_sql = 'update members set state = 2,degree = 0 where my_key = ?';
  db.mysql.query(update_sql, my_key, function(err, result) {
    if (err) {
      console.error(err);
      // res.json({'res':'0'});
      throw Error(err);
    }
    // console.log('member state update success!');
    //res.json({'res':'1'});

    // 아래 부분 주의!
    next(res.redirect('/api/v2/noti?my_key=' + my_key));
  });

});

module.exports = router;
