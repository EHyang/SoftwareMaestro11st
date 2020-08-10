var express    = require('express');
var db         = require('../dbconfig');
var router = express.Router();

router.get('/',function(req,res){
  console.log("test DB");
  db.mysql.query('SELECT * from members', function(err, rows) {
    if(err) throw err;
    //console.log('The solution is: ', rows);
    res.send(rows);
  });
});

module.exports = router;
