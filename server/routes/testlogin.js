/*
2020-10-07 태양
login.js을 대체하여 사용중임.

코드 정리 필요
*/

var express = require('express');
var db = require('../dbconfig-load');
var uuid4 = require('uuid4');
var router = express.Router();

router.post('/', function(req, res) {
  console.log('someggggggggggggggggggggggggggggggggggg');
  console.log(req.body);
  var google_id = req.body.google_id;
  var token = req.body.token;
  var my_key = req.body.google_id;
  var login_sql = 'select * From testmembers where google_id = ?';

  db.mysql.query(login_sql, google_id, function(err, rows, fields) {
    if (err) {
      console.log('137 err :' + err);
      res.json({
        'res': '-1'
      });
    } else {
      console.log(rows);
      if (rows[0] == undefined) {
        console.log(rows[0]);

        var insert_sql = 'insert into testmembers (google_id,token,my_key,lastest_use) values(?,?,?,?)';
        var now_time = new Date();

        var param = [google_id, token, my_key, now_time];
        db.mysql.query(insert_sql, param, function(err, result) {
          if (err) {
            console.log('150 err :' + err);
            res.json({
              'res': '-1'
            });
            return;
          } else {
            console.log('input success!');
          }
        });
        console.log("sign up success");
        res.json({
          'res': my_key
        });
      } else {
        console.log('login success');
        console.log(rows[0]['google_id'] + ' now state is : ' + rows[0]['state']);
        var update_sql = 'update testmembers set lastest_use = (?) where google_id = (?)';
        var now_time = new Date();

        var param = [now_time, google_id];
        my_key = rows[0]['my_key'];
        db.mysql.query(update_sql, param, function(err, result) {
          if (err) {
            console.log('178 err : ' + err);
            res.json({
              'res': '-1'
            });
          } else {
            console.log('update lastest use time!');
          }
        });

        //req.session.displayname = my_mac;

        var re = [rows[0]['state'], '0'];
        res.json({
          'res': my_key
        });
        //  res.render('input_data');
      } // else -- end
    } // else -- end
  }); // login_sql db -- end
}); // router -- end

module.exports = router;
