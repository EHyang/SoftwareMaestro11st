/*
2020-11-05 현우
- 추가. 테스트용 api
*/

var express = require('express');
var db = require('@db');
var FCM = require('fcm-node');

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(process.env);
  console.log('call set!');
  console.log(req.body);
  var my_key = req.body.my_key;
  var level = req.body.level;
  var update_sql = `update members set state = ${level},degree=0 where my_key = ?`;
  db.mysql.query(update_sql, my_key, function(err, result) {
    if (err) {
      console.log(err);
      //res.json({'res':'0'});
    }
    console.log('member state update success!');
    res.json({'res':'0'});
  });

});

module.exports = router;
