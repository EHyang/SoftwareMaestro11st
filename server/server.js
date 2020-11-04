/*
2020-10-10 태양
사용하지 않는 라우터 정리.

2020-10-19 태양
hospital_crawling을 접근해줘야 node-cron 이 실행되기에
한번 접근함.

2주지난 데이터 삭제를 위해 everyMidnight.js 작성함.
*/


var express    = require('express');
var bodyParser = require('body-parser');
//var session    = require('express-session');
var db         = require('./dbconfig-load');
var path       = require('path');

var app = express();

//var loginRouter = require('./routes/login');
var everyMidnight = require('./routes/everyMidnight');

var routes = require('./routes');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret:'12345678',
//   resave:false,
//   saveUninitalized:true
// }));

app.use('/node_modules', express.static(path.join(__dirname+'/node_modules')));

app.set('port', 3001);

app.use('/api', routes);

module.exports=app;
