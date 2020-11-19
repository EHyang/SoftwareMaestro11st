/**
 * 2020-10-10 태양
 * - 사용하지 않는 라우터 정리.
 * 
 * 2020-10-19 태양
 * - hospital_crawling을 접근해줘야 node-cron이 실행되기에 한번 접근함.
 * - 2주지난 데이터 삭제를 위해 everyMidnight.js 작성함.
 * 
 * 2020-11-12 현우
 * - 코드 정리 및 주석 제거
 */

var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');

var app = express();

var routes = require('./routes');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/node_modules', express.static(path.join(__dirname+'/node_modules')));
app.use('/views', express.static(path.join(__dirname+'/views')));
app.set('port', 3000);

app.use('/api', routes);

app.get('/', function(req, res){
    console.log('someone connect your page');
    res.render('index');
  });

module.exports=app;
