/*
2020-10-07 태양

각종 코드 확인용 js파일임.
*/

var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var db = require('../dbconfig');
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
  });
});

module.exports = router;
