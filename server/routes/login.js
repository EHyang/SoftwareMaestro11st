/*
2020-10-07 태양
login.js -> testlogin.js 대체 사용. 삭제 필요
*/

// var express    = require('express');
// var db         = require('../dbconfig');
// var router = express.Router();
//
// router.post('/', function(req,res){
//   console.log('someggggggggggggggggggggggggggggggggggg');
//   console.log(req.body);
//   var google_id = req.body.google_id;
//   var my_mac = req.body.my_mac;
//   var login_sql = 'select * From members where google_id = ?';
//
//   db.mysql.query(login_sql, google_id, function(err,rows,fields){
//     if(err){
//       console.log('137 err :' + err);
//       res.json({'res':'1','state':'-1'});
//     } else {
//       console.log(rows);
//       if(rows[0] == undefined){
//         console.log(rows[0]);
//         var create_sql = 'create table `' + my_mac + '` (num int not null auto_increment primary key, scan_mac varchar(45) not null, scan_time varchar(45) not null)';
//         var insert_sql = 'insert into members (google_id,my_mac,lastest_use) values(?,?,?)';
//         var now_time = new Date();
//
//         var param = [google_id,my_mac,now_time];
//         db.mysql.query(insert_sql,param,function(err,result){
//           if(err){
//             console.log('150 err :' + err);
//             res.json({'res':'1','state':'-1'});
//           }else {
//             console.log('input success!');
//           }
//         });
//         db.mysql.query(create_sql,function(err,result){
//           if(err){
//             console.log('158 err : ' + err);
//             res.json({'res':'1','state':'-1'});
//           } else {
//             console.log('create table success!');
//             //req.session.displayname = my_mac;
//           //  res.render('input_data');
//           }
//         });
//         console.log("sign up success");
//         res.json({'res':'0', 'state':'0'});
//       } else {
//         console.log('login success');
//         console.log(rows[0]['google_id'] + ' now state is : ' + rows[0]['state']);
//         var update_sql = 'update members set lastest_use = (?) where google_id = (?)';
//         var now_time = new Date();
//
//         var param = [now_time,google_id];
//
//         db.mysql.query(update_sql,param,function(err,result){
//           if(err){
//             console.log('178 err : ' + err);
//             res.json({'res':'1','state':'-1'});
//           }else{
//             console.log('update lastest use time!');
//           }
//         });
//
//         //req.session.displayname = my_mac;
//
//         var re = [rows[0]['state'],'0'];
//         res.json({'res':'0', 'state':rows[0]['state']});
//       //  res.render('input_data');
//       }
//     }
//   });
// });
//
// module.exports = router;
