var express = require('express');
var router = express.Router();
const {User} = require('../models');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.debug('login');

  console.log(User);

  User
  .findOrCreate({where: {googleID: req.body.googleID,
  mac: req.body.mac}})
  .then(([user, created]) => {
    console.log(user.get({
      plain: true
    }))
    if(created==false){
      // user already exists. doesn't matter.
    }
    req.session.user=user;
    console.log(created);
    res.send(200); 
  }).catch(function(error){
    
    console.error(error);
    res.sendStatus(400);
  })
    
})


module.exports = router;
