var express = require('express');
var router = express.Router();
const config = require('config');
// const jwt = require('jsonwebtoken');
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
        my_id:req.session.user.scan_id,
        scan_id:req.body.scan_id,
      }
    })

  res.sendStatus(201);
})

router.post('/bulk', async function(req, res, next){  // 스캔 정보 전송
  console.debug('bulk creation started');
  
  // let jwtok = req.cookies.user;

  // let decoded = jwt.verify(jwtok, config.secret);
  // if(decoded){
  //   res.send("권한이 있어서 API 수행 가능")
  // }
  // else{
  //   res.send("권한이 없습니다.")
  // }

  if(!req.session.user.id){
    console.error('creation fail. please login first');
    res.sendStatus('400');
    return;
  }

  console.debug('req.body:');
  console.debug(req.body);

  req.body.scans.forEach(scan => {
    scan.my_id=req.session.user.scan_id
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
          scan_id: scan.scan_id
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
