var express    = require('express');
var db         = require('../dbconfig');
var router = express.Router();

router.post('/',function(req,res){
  console.log(req.body);
//  var id = req.params;
  // console.log("session id is = " + req.session.displayname);
  // var my_mac = req.body.my_mac;
  // var scan_mac = req.body.scan_mac;
  // var scan_time = req.body.scan_time;
  // var insert_sql = 'insert into `'+ my_mac +'` (scan_mac,scan_time) values(?,?)';
  // var param = [scan_mac,scan_time];
  //
  // db.mysql.query(insert_sql,param,function(err,result){
  //   if(err){
  //     console.log(err);
  //     res.json({'msg' : 'Failed input data'});
  //   }
  //   console.log('input success!');
  // });
  //
  // var update_sql = 'update members set lastest_use = (?) where my_mac = (?)';
  // var now_time = getCurrentTime();
  //
  // var param = [now_time,my_mac];
  //
  // db.mysql.query(update_sql,param,function(err,result){
  //   if(err){
  //     console.log('178 err : ' + err);
  //     res.json({'msg' : 'Failed update lastest time'});
  //   }else{
  //     console.log('update lastest use time!');
  //   }
  // });
  res.json({'res':'0'});
});

module.exports = router;
