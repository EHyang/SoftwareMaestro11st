var express    = require('express');
var db         = require('../dbconfig');
var path       = require('path');
var router = express.Router();

router.get('/',function(req,res){
  console.log("test DB");
  var num = req.body.num;
  var select_query = "SELECT * from members where num = ?";
  db.mysql.query(select_query, num, function(err, rows) {
    if(err) throw err;
    //console.log('The solution is: ', rows);
    res.json(rows);
  });
});

module.exports = router;
