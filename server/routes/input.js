var express = require('express');
var db = require('../dbconfig');
var router = express.Router();

router.post('/', function(req, res) {
//  var my_key = req.body[0].my_key;
  var my_key;
  var scan = req.body;
  var data = req.body;
  var length = scan.length;
  console.log(req.body);
  console.log(length);
  var insert_sql = "insert into scan (my_key, scan_key, scan_time) values ";

  var scan_key, scan_time;

  for (var i = 0; i < length; ++i) {
    my_key = data[i].my_key;
    scan_key = data[i].scan_key;
    scan_time = data[i].scan_time;

    insert_sql += "('" + my_key + "', '" + scan_key + "', '" + scan_time + "'),";
  }

  insert_sql = insert_sql.slice(0, -1);
  console.log(insert_sql);
  db.mysql.query(insert_sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({
        'res': '-1'
      });
    }
    console.log('input success!');
    res.json({
      'res': '0'
    });
  });

});

module.exports = router;
