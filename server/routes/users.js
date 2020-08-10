var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  console.debug('login');
  if(!req.body.google_id){
    console.error('google id is null');
    res.sendStatus(400);
  }

  const preUser = await models.User.findOne({
    where:{
      mac: req.body.mac
    }
  })

  if(preUser){
    console.info('mac already exists. checking whether this is a new user');
    if(!preUser.google_id){
      console.info('this is a new user');
      await preUser.update({
        google_id: req.body.google_id
      })

      if(!preUser.google_id){
        console.error('what?? this is no way.')
      }
      res.sendStatus(200);
      // TODO: check that user model is fully configured 
    } else {
      console.debug('google id is also exists. inserting new record');
    }
  }
 
  models.User
  .findOrCreate({where: {google_id: req.body.google_id,
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
    res.sendStatus(200);
  }).catch(function(error){
    
    console.error(error);
    res.sendStatus(400);
  })
})

    
})


module.exports = router;
