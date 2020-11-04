/*
2020-10-07 태양
scan.js을 사용하지 않기 위해 만듬.
my_key는 현재 google_id 를 사용함.

2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- dbconfig-load 사용

2020-11-04 현우
- rename: input->scan
*/

// TODO: v3에 합치기
// 고려사항(합칠부분):
// - 사용 테이블
// - 라우트 이름

var express = require('express');
var db = require('@db');
var router = express.Router();


router.post('/', function(req, res) {
  //  var my_key = req.body[0].my_key;
  var my_key;
  var scan = req.body;
  var data = req.body;
  var length = scan.length;
  var insert_sql = "insert into scan (my_key, scan_key, scan_time) values ";

  var scan_key, scan_time;

  for (var i = 0; i < length; ++i) {
    my_key = data[i].my_key;
    scan_key = data[i].scan_key;
    scan_time = data[i].scan_time;
    insert_sql += "('" + my_key + "', '" + scan_key + "', '" + scan_time + "'),";
  }

  insert_sql = insert_sql.slice(0, -1);

//  console.log(insert_sql);

  db.mysql.query(insert_sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({
        'res': '-1'
      });
    }
    console.log('scandata input success!');
    res.json({
      'res': '0'
    });
  }); // insert db -- end

}); // router -- end

module.exports = router;
