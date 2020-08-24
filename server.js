var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var db         = require('./dbconfig');
var path       = require('path');

var app = express();

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var scanRouter = require('./routes/scan');
var testRouter  = require('./routes/test');
var hospRouter  = require('./routes/hosp');
var inputRouter = require('./routes/input');
var testlogin = require('./routes/testlogin');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret:'12345678',
  resave:false,
  saveUninitalized:true
}));

app.use('/node_modules', express.static(path.join(__dirname+'/node_modules')));

app.set('port', 3000);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/scan', scanRouter);
app.use('/test', testRouter);
app.use('/hosp', hospRouter);

app.use('/input', inputRouter);
app.use('/testlogin', testlogin);

app.listen(3000, function () {
  console.log('Express server listening on port ' + app.get('port'));
});
