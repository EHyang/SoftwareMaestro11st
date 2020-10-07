var express    = require('express');
var bodyParser = require('body-parser');
//var session    = require('express-session');
var db         = require('./dbconfig');
var path       = require('path');

var app = express();

//var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
//var scanRouter = require('./routes/scan');
var testRouter  = require('./routes/test');
var hospRouter  = require('./routes/hopital_crawling');
var hospitalRouter = require('./routes/hospital_check');
var inputRouter = require('./routes/input');
var testlogin = require('./routes/testlogin');
var reloadRouter = require('./routes/reload');

var confirm = require('./routes/confirmed');
var testnoti = require('./routes/noti');

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

app.set('port', 3000);

app.use('/', indexRouter);
//app.use('/login', loginRouter);
//app.use('/scan', scanRouter);
app.use('/test', testRouter);
app.use('/hospital_crawling', hospRouter);
app.use('/hospital_check', hospitalRouter);

app.use('/input', inputRouter);
app.use('/testlogin', testlogin);
app.use('/reload', reloadRouter);

app.use('/noti', testnoti);
app.use('/confirmed', confirm);

module.exports=app;
