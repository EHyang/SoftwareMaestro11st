/*
2020-10-07 태양
코드 정리 필요

2020-10-23 태양
코드 정리, log 삭제

2020-10-30 태양
- 접촉자에게 알림보내기전에 상태 업데이트
- 접촉자에게 알림과 동시에 접촉시간 전송(진행중)
*/

var express = require('express');
var db = require('../dbconfig');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
var fcm = new FCM(serverKey);

router.get('/', function(req, res) {
  console.log(req.query.my_key + " send noti");
  var infect = req.query.my_key;

  var select_scan = 'select distinct scan_key from scan where my_key = ?';
  var select_my = 'select distinct my_key from scan where scan_key = ?';
  var arr = [];
  db.mysql.query(select_scan, infect, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["scan_key"]);
      }
    }
  });
  db.mysql.query(select_my, infect, function(err, rows, fields) {
    if (err) {
      console.log(err);
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
        console.log(err);
      } else {
        for (var i = 0; i < rows.length; ++i) {
          console.log(rows[i]['token']);
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
    });
  });
});

module.exports = router;
