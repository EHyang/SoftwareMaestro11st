/*
2020-10-07 태양
login.js을 대체하여 사용중임.

코드 정리 필요
*/

var express = require('express');
var db = require('../dbconfig');
var uuid4 = require('uuid4');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('cleaning tables...');
  
  var drop_members_sql = 'truncate testmembers';

  db.mysql.query(drop_members_sql, [], function(err, rows, fields) {
    if (err) {
      console.log('165 err :' + err);
    } else {
      // console.log(rows);
    } // else -- end
  }); // login_sql db -- end

  
  var drop_scans_sql = 'truncate scan';

  db.mysql.query(drop_scans_sql, [], function(err, rows, fields) {
    if (err) {
      console.log('166 err :' + err);
      res.json({
        'res': '-1'
      });
    } else {
      // console.log(rows);
      res.sendStatus(200);
    } // else -- end
  }); // login_sql db -- end
}); // router -- end

module.exports = router;
