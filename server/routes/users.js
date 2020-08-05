var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.debug('login');
  console.log(req.body.username);
  models.user
  .findOrCreate({where: {username: req.username}, defaults: {job: 'Technical Lead JavaScript'}})
  .then(([user, created]) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created);
  })
  res.json({'what':'what'})
})


module.exports = router;
