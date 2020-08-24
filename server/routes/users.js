var express = require('express');
var router = express.Router();
// var serviceAccount = require("../../config/nice-dotda-firebase-adminsdk-36j2q-87fd7c2ee6.json");
var config = require('config');
var serviceAccount = config.get('firebaseSDK')

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

router.post('/state', async function(req, res, next){ // 확진자 신고
  console.debug('marking you as infected');
  
  if(!req.body.key=='secretPassKey'){
    console.error('not allowed');
    res.sendStatus(404);
  }

  let t = await sequelize.transaction();
  let targetUser;
  try {
    targetUser = await models.User
    .findOne({ where: {
      // mac: req.body.mac
        mac: req.body.target_mac
      }, transaction:t})
    console.debug(`targetUser: ${targetUser}`);
    if(targetUser){
      console.debug('found target infected user:');
      // console.debug(targetUser);
    
      const updatedUser = await targetUser.update({
        state: req.body.target_state
      }, {transaction:t})
      // req.session.user=updatedUser;
      console.debug('state update success');
      
      visited={};
      if(req.body.target_state==2){
        await propagateContact(req.body.target_mac, req.body.target_state, 1, t);
      }

      t.commit();
      res.sendStatus(204);

    } else throw Error('user not found');

  } catch (error) {
    console.error('state marking failed. reverting');
    console.error(error);
    t.rollback();
  }
  

})

})
      req.session.user=updatedUser;
      console.debug('update success');

      res.sendStatus(204)
    }
})

module.exports = router;
