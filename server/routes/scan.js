var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  console.log(req.session);
  // console.log(req.session.table);

  res.json(req.session);
})

router.post('/', async function(req, res, next) {
  console.log(req.session);
  console.log(req.session.user.mac);
  if(!req.session.user.mac){
    console.debug('please login first');
    res.redirect('/users/login');
    return;
  }
  
  const created = await models.Scan
    .findOrCreate({
      where: {
        my_mac:req.session.user.mac,
        scan_mac:req.body.scan_mac,
      }
    })

  res.sendStatus(201);
})

});

module.exports = router;
