/*
2020-11-04 현우
- 추가. 현재 상태 확인용
*/

var express = require('express');
var db = require('@db');

var router = express.Router();

router.post('/', function(req, res, next) {
  // console.log(req);
  
  console.log(req.body);
  var my_key = req.body.my_key;
  var select_sql = 'select state from members where my_key = ?';
  try {
    db.mysql.query(select_sql, my_key, function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.json({'res':'0'});
        return;
      }
      console.log('select success!');
      res.json({'res':rows[0].state});
    });
    
  } catch (error) {
    
  }

});



module.exports = router;
