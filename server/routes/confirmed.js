var express = require('express');
var db = require('../dbconfig-load');
var FCM = require('fcm-node');

var router = express.Router();
var serverKey = 'AAAAAUxbBP0:APA91bGJXZcQPsAjo-CZjCNGuE7zWzN4SjF_2hfoMGefgwJmneM82GBa1SnTN87xwEBsF8Yv8tjKkTKtvgE-bn0w_0QNGS08faIA6r6ofR41nreQbIepS4mFXfLU_ETLOwpsbtbgT5Sr';
var fcm = new FCM(serverKey);

router.post('/', function(req, res, next) {
  // console.log(req);
  console.log(req.body);
  var my_key = req.body.my_key;
  var update_sql = 'update members set state = 2,degree=0 where my_key = ?';
  db.mysql.query(update_sql, my_key, function(err, result) {
    if (err) {
      console.log(err);
      res.json({'res':'0'});
      return;
    }
    console.log('update success!');
    //res.json({'res':'1'});
    next(res.redirect('/noti/?my_key=' + my_key));
  });

});

  var my_key = req.body.my_key;

router.post('/v2', function(req, res, next) {
  console.log('call confirm!');
  var my_key = req.body.my_key;
  var update_sql = 'update members set state = 2,degree=0 where my_key = ?';
  db.mysql.query(update_sql, my_key, function(err, result) {
    if (err) {
      console.log(err);
      //res.json({'res':'0'});
    }
    console.log('update success!');
    //res.json({'res':'1'});
    next(res.redirect('/noti/v2?my_key=' + my_key));
  });

});

module.exports = router;
