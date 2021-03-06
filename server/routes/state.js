/*
2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- v2 api 추가 버전 병합
- dbconfig 로드 스크립트 사용
- members 테이블 사용
*/

var express = require('express');
var db = require('../dbconfig-load');
var FCM = require('fcm-node');

var router = express.Router();
//var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
//var fcm = new FCM(serverKey);

router.post('/', function(req, res, next) {
  // console.log(req);
  console.log(req.body);
  var my_key = req.body.my_key;
  var select_sql = 'select state from members where my_key = ?';
  db.mysql.query(select_sql, my_key, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.json({'res':'0'});
      return;
    }
    console.log('select success!');
    res.json({'res':rows[0].state});
  });

});



module.exports = router;
