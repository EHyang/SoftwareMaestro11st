/*
2020-10-07 태양
코드 정리 필요
*/

var express = require('express');
var db = require('../dbconfig-load');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
var fcm = new FCM(serverKey);

router.get('/', async function(req, res) {
  console.log(req.query.my_key + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!내가 노티보낸다고!!!!!!!!!!!!!!!!!!!!!!!!!");
  var my_key = req.query.my_key;

  var select_scan = 'select distinct scan_key from scan where my_key = ?';
  var select_my = 'select distinct my_key from scan where scan_key = ?';
  var arr = [];
  await db.mysql.query(select_scan, my_key, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["scan_key"]);
      }
    }
  });
  await db.mysql.query(select_my, my_key, async function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["my_key"]);
      }
    }
    console.log(arr);

    var uniq = arr.reduce(function(a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);

    
    if(uniq[0]=='undefined'){
      uniq=uniq.splice(1);
    }
    
    console.log(uniq);
    console.log(uniq);
    var select_token = 'select token from testmembers where my_key = ?';
    select_token = 'select * from testmembers';

    await db.mysql.query(select_token, uniq, async function(err, rows, fields) {
      console.log("여기");
      console.log(rows);
      const tokens=[];
      const errors=[];
      if (err) {
        console.log(err);
      } else {
        for (var i = 0; i < rows.length; ++i) {
          console.log(rows[i]['token']);
          tokens.push(rows[i]['token']);
          var message = {
            to: rows[i]['token'],
            collapse_key: 'dev',

            notification: {
              title: 'hello',
              body: 'Hi there~'
            }
          };
          fcm.send(message, function(err, res) {
            if (err) {
              console.log(err);
              console.log("에러나써");
              errors.push(err);
            } else {
              console.log("잘가써");
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

module.exports = router;
