/*
2020-10-07 태양
scan.js -> input.js 대체 사용. 삭제예정
*/

// var express    = require('express');
// var db         = require('../dbconfig');
// var router = express.Router();
//
// router.post('/',function(req,res){
//   var id = req.query.id;
//   var length = req.body.length;
//   var data = req.body;
//
//   var insert_sql = "insert into `" + id + "` (scan_mac, scan_time) values ";
//
//   console.log(length);
//
//   var scan_mac, scan_time;
//
//   for(var i = 0; i < length; ++i)
//   {
//     scan_mac = data[i].scan_mac;
//     scan_time = data[i].scan_time;
//
//     insert_sql += "('" + scan_mac + "', '" + scan_time + "'),";
//   }
//
//   insert_sql = insert_sql.slice(0,-1);
//   console.log(insert_sql);
//
//   db.mysql.query(insert_sql,param,function(err,result){
//     if(err){
//       console.log(err);
//       res.json({'msg' : 'Failed input data'});
//     }
//     console.log('input success!');
//   });
//
//   var update_sql = 'update members set lastest_use = (?) where my_mac = (?)';
//   var now_time = new Date();
//   var param = [now_time, id];
//
//   db.mysql.query(update_sql,param,function(err,result){
//     if(err){
//       console.log('178 err : ' + err);
//       res.json({'msg' : 'Failed update lastest time'});
//     }else{
//       console.log('update lastest use time!');
//     }
//   });
//   res.json({'res':'0'});
// });
//
// module.exports = router;
