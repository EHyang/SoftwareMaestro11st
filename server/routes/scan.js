var express = require('express');
var router = express.Router();
const models = require('../models');
const { sequelize } = require('../models');

router.get('/', function(req, res, next) {
  console.log(req.session);
  // console.log(req.session.table);

  res.json(req.session);
})

router.post('/', async function(req, res, next) {
  console.log(req.session);
  console.log(req.session.user.token);
  if(!req.session.user.token){
    console.debug('please login first');
    res.redirect('/users/login');
    return;
  }

  const created = await models.Scan
    .findOrCreate({
      where: {
        my_token:req.session.user.token,
        scan_token:req.body.scan_token,
      }
    })

  res.sendStatus(201);
})

router.post('/bulk', async function(req, res, next){  // 스캔 정보 전송
  console.debug('bulk creation started');
  if(!req.session.user.token){
    console.error('creation fail. please login first');
    res.sendStatus('400');
    return;
  }

  console.debug('req.body:');
  console.debug(req.body);

  req.body.scans.forEach(scan => {
    scan.my_token=req.session.user.token
  });
  
  console.debug('request scan data:');
  console.debug(req.body.scans);
  const t = await sequelize.transaction();
  try {
    const createdScans = await models.Scan
      .bulkCreate(
        req.body.scans, {transaction: t}
      );
    
    if(createdScans.length>0){
      console.debug('scans create success');
      console.debug(`scans create length: ${createdScans.length}`);

      await Promise.all(createdScans.map(async (scan) => {  // 스캔 접촉 비동기 동시 실행
        console.debug(`scan: ${scan}`)
        const user = await models.User.findOrCreate({where: {
          token: scan.scan_token
        }, transaction:t});
        console.debug(`user: ${user}`);
      }))
      
      t.commit();
      res.sendStatus(201);
    } else {
      throw Error('invalid scans');
    }

  } catch (error) {
    console.error(error);
    t.rollback();
    res.sendStatus(400);
  }
})

module.exports = router;
