var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('create new session');
  if(req.session.user){
    console.log('session already exists');
  } else {
    req.session.user = {
      name: 'new name',
      accessTime: new Date()
    }
  }
  res.send('this is session route');
});

router.get('/confirm', function(req, res, next) {
  console.log('session check:');
  let msg='session does not exist';
  if(req.session.user){
    msg=`your access time is ${req.session.user.accessTime}`;
  }
  res.send(msg);
})

router.get('/debug', function(req, res, next) {
  console.log('session check:');
  console.debug(req.session)
  res.json(req.session);
})

router.get('/destroy', function(req, res, next) {
  req.session.destroy();
  console.log('deleted session');
  res.redirect('/confirm');
})

module.exports = router;
