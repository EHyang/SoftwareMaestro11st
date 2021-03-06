const express = require('express');
const confirmed = require('./confirmed');
const hospital_check = require('./hospital_check');
const noti = require('./noti');
const scan = require('./scan');
const state = require('./state');
const login = require('./login');
const count = require('./count');
const local = require('./local_count');
const test = require('./test');
const dev = require('./dev');
const swaggerDocs = require('./api-docs');
const info = require('./info')

const router = new express.Router();
router.use('/confirmed', confirmed);
router.use('/hospital_check', hospital_check);
router.use('/noti', noti);
router.use('/scan', scan);
router.use('/state', state);
router.use('/login', login);
router.use('/count', count);
router.use('/local',local);
router.use('/test',test);
router.use('/dev', dev);
router.use(swaggerDocs);
router.use('/info',info);
module.exports = router;



