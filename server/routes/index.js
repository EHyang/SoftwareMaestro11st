var express    = require('express');
var router = express.Router();

//var scanRouter = require('./routes/scan');
var testRouter  = require('./test');
var hospRouter  = require('../util/hospital_crawling');
var everyMidnight = require('../util/everyMidnight');
var hospitalRouter = require('./hospital_check');
var inputRouter = require('./input');
var testlogin = require('./testlogin');
var reloadRouter = require('./reload');
var stateRouter = require('./state');

var confirm = require('./confirmed');
var testnoti = require('./noti');


const v2 = require('./v2');
const v3 = require('./v3');

router.get('/', function(req, res){
  res.sendStatus(200);
});

//router.use('/login', loginRouter);
//router.use('/scan', scanRouter);
router.use('/test', testRouter);
//router.use('/hospital_crawling', hospRouter);
router.use('/hospital_check', hospitalRouter);

router.use('/scan', inputRouter);
router.use('/login', testlogin);
router.use('/reload', reloadRouter);
router.use('/state', stateRouter);
router.use('/noti', testnoti);
router.use('/confirmed', confirm);

router.use('/v2', v2);
router.use('/v3', v3);

module.exports = router;