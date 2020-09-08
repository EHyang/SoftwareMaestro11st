var express = require('express');
var db = require('../dbconfig');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
var fcm = new FCM(serverKey);

router.get('/', function(req, res) {
  console.log(req.query.my_key + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!내가 노티보낸다고!!!!!!!!!!!!!!!!!!!!!!!!!");
  var my_key = req.query.my_key;

  var select_scan = 'select distinct scan_key from scan where my_key = ?';
  var select_my = 'select distinct my_key from scan where scan_key = ?';
  var arr = [];
  db.mysql.query(select_scan, my_key, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < rows.length; ++i) {
        arr.push(rows[i]["scan_key"]);
      }
    }
  });
  db.mysql.query(select_my, my_key, function(err, rows, fields) {
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

    console.log(uniq);

    var select_token = 'select token from testmembers where my_key = ?';

    db.mysql.query(select_token, uniq, function(err, rows, fields) {
      console.log("여기");
      if (err) {
        console.log(err);
      } else {
        for (var i = 0; i < rows.length; ++i) {
          console.log(rows[i]['token']);
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
            } else {
              console.log("잘가써");
            }
          });
        }
      }
    });
  });
});

module.exports = router;