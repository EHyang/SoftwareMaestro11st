/*
2020-10-07 태양
수집된 선별진료소 목록을 확인하기 위해 임시로 만들어짐.
*/

var express = require('express');
var db = require('../dbconfig-load');

var router = express.Router();

router.get('/', async function(req, res) {
  var show = "<html><head><title>시발...</title></head><body><table><th>num</th><th>name</th><th>x</th><th>y</th>";
  await db.mysql.query("select * from hospital", function(err, rows, fields) {
    for (var i = 0; i < rows.length; i++) {
      show += "<tr>";
      show += "<td>" + rows[i]['num'] + "</td>";
      show += "<td>" + rows[i]['name'] + "</td>";
      show += "<td>" + rows[i]['x'] + "</td>";
      show += "<td>" + rows[i]['y'] + "</td>";
      show += "</tr>";
    }
    show += "</table></body></html>";
    res.send(show);
  }); // select db -- end
}); // router -- end

module.exports = router;
