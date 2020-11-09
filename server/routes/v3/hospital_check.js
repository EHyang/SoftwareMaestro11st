/*
2020-10-07 태양
수집된 선별진료소 목록을 확인하기 위해 임시로 만들어짐.

2020-10-10 태양
업로드된 시간 가져오기 위한 코드 추가

2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- dbconfig-load 사용

2020-11-09 태양
- 화면으로 보여주는 것 대신 바로 JSON 으로 응답 전송
*/

var express = require('express');
var db = require('@db');

var router = express.Router();

router.get('/', async function(req, res) {
  var show = "<html><head><title>선별진료소 목록</title></head><body>";
  await db.mysql.query("select * from tt", function(err,rows,fields){
    if (err) {
      console.log("선별 진료소 목록 가져오기 실패");
    }else {
      show += "<h2>";
      show += rows[0]['time'];
      show += "</h2>";
    }
  });

  show += "<table><th>num</th><th>name</th><th>x</th><th>y</th>";
  await db.mysql.query("select * from hospital", function(err, rows, fields) {
    for (var i = 0; i < rows.length; i++) {
      show += "<tr>";
      show += "<td>" + rows[i]['num'] + "</td>";
      show += "<td>" + rows[i]['name'] + "</td>";
      show += "<td>" + rows[i]['x'] + "</td>";
      show += "<td>" + rows[i]['y'] + "</td>";
      show += "</tr>";
    }
    res.json(rows);
    //show += "</table></body></html>";
    //res.send(show);
  }); // select db -- end
}); // router -- end

module.exports = router;
