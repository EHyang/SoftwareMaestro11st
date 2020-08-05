var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var db         = require('./dbconfig');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret:'12345678',
  resave:false,
  saveUninitalized:true
}));

function addZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function getCurrentTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());

    var currentTime = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
    return currentTime;
}

app.set('port', 3000);

app.get('/', function(req, res){
  console.log('someone connect your page');
  res.render('index');
});

app.get('/search_data', function(req, res){
  db.mysql.query('SELECT * from test', function(err, rows) {
    if(err) throw err;
    //console.log('The solution is: ', rows);
    res.send(rows);
  });
});
//
// app.post('/user/join', function(req,res){
//   console.log('someone touch my join');
//   var google_id = req.body.google_id;
//   var my_mac = req.body.my_mac;
//   var now_time = getCurrentTime();
//   var join_sql = 'insert into members (google_id,my_mac,lastest_use) values(?,?,?)';
//   var create_sql = 'create table ' + my_mac + '(num int not null auto_increment primary key, scan_mac varchar(45) not null, scan_time varchar(45) not null)';
//
//   var param = [google_id,my_mac,now_time];
//   db.mysql.query(join_sql,param,function(err,result){
//     if(err){
//       console.log('err :' + err);
//       res.json({'res':'1'});
//     }else{
//       console.log('insert member success!');
//     }
//   });
//   db.mysql.query(create_sql,function(err,result){
//     if(err){
//       console.log('err :'+err);
//       res.json({'res':'1'});
//     }else{
//       console.log('create table success!');
//     }
//   });
//   console.log('sign up success!');
//   res.json({'res':'0', 'state':'0'});
// });
//
app.post('/user/login', function(req,res){
  console.log('someone touch my login');
  var google_id = req.body.google_id;
  var login_sql = 'select * from members where google_id = ?';

  db.mysql.query(login_sql,google_id,function(err,rows,fields){
    if(err){
      console.log('err :' + err);
      res.json({'res':'1'});
    }else{
      if(rows[0] == undefined){
        console.log('there is not exist ID');
        res.json({'res':'1'});
      }else {

        var update_sql = 'update members set lastest_use = (?) where google_id = (?)';
        var now_time = getCurrentTime();

        var param = [now_time,google_id];

        db.mysql.query(update_sql,param,function(err,result){
          if(err){
            console.log(err);
            res.send('1');
          }else{
            console.log('login success');
            console.log(rows[0]['state']);
            console.log('update lastest use time!');
          }
        });
        res.json({'res':'0', 'state':rows[0]['state']});
      }
    }
  });
});

app.post('/login', function(req,res){
  //console.log('someggggggggggggggggggggggggggggggggggg');
  console.log(req.body);
  var google_id = req.body.google_id;
  var my_mac = req.body.my_mac;
  var login_sql = 'select * From members where google_id = ?';

  db.mysql.query(login_sql, google_id, function(err,rows,fields){
    if(err){
      console.log('137 err :' + err);
      res.json({'res':'1','state':'-1'});
    } else {
      console.log(rows);
      if(rows[0] == undefined){
        console.log(rows[0]);
        var create_sql = 'create table `' + my_mac + '` (num int not null auto_increment primary key, scan_mac varchar(45) not null, scan_time varchar(45) not null)';
        var insert_sql = 'insert into members (google_id,my_mac,lastest_use) values(?,?,?)';
        var now_time = getCurrentTime();

        var param = [google_id,my_mac,now_time];
        db.mysql.query(insert_sql,param,function(err,result){
          if(err){
            console.log('150 err :' + err);
            res.json({'res':'1','state':'-1'});
          }else {
            console.log('input success!');
          }
        });
        db.mysql.query(create_sql,function(err,result){
          if(err){
            console.log('158 err : ' + err);
            res.json({'res':'1','state':'-1'});
          } else {
            console.log('create table success!');
            req.session.displayname = my_mac;
          //  res.render('input_data');
          }
        });
        console.log("sign up success");
        res.json({'res':'0', 'state':'0'});
      } else {
        console.log('login success');
        console.log(rows[0]['state']);
        var update_sql = 'update members set lastest_use = (?) where google_id = (?)';
        var now_time = getCurrentTime();

        var param = [now_time,google_id];

        db.mysql.query(update_sql,param,function(err,result){
          if(err){
            console.log('178 err : ' + err);
            res.json({'res':'1','state':'-1'});
          }else{
            console.log('update lastest use time!');
          }
        });

        req.session.displayname = my_mac;

        var re = [rows[0]['state'],'0'];
        res.json({'res':'0', 'state':rows[0]['state']});
      //  res.render('input_data');
      }
    }
  });
});

app.get('/input_data', function(req, res){
  console.log("it's okay");
  res.render('input_data');
});

app.get('/logout',function(req,res){
  console.log("logout");
  delete req.session.displayname;
  res.redirect('/');
});

app.post('/input_my_table',function(req,res){
  console.log(req.body);
  console.log("session id is = " + req.session.displayname);
  var my_mac = req.body.my_mac;
  var scan_mac = req.body.scan_mac;
  var scan_time = req.body.scan_time;
  var insert_sql = 'insert into `'+ my_mac +'` (scan_mac,scan_time) values(?,?)';
  var param = [scan_mac,scan_time];

  db.mysql.query(insert_sql,param,function(err,result){
    if(err){
      console.log(err);
      res.json({'msg' : 'Failed input data'});
    }
    console.log('input success!');
  });

  var update_sql = 'update members set lastest_use = (?) where my_mac = (?)';
  var now_time = getCurrentTime();

  var param = [now_time,my_mac];

  db.mysql.query(update_sql,param,function(err,result){
    if(err){
      console.log('178 err : ' + err);
      res.json({'msg' : 'Failed update lastest time'});
    }else{
      console.log('update lastest use time!');
    }
  });
  res.json({'res':'0', 'msg' : 'input success'});
});




app.listen(3000, function () {
  console.log('Express server listening on port ' + app.get('port'));
});
