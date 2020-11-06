const express = require('express');
const confirmed = require('./confirmed');
const hospital_check = require('./hospital_check');
const noti = require('./noti');
const reload = require('./reload');
const scan = require('./scan');
const state = require('./state');
const login = require('./login');
const count = require('./count');
const local = require('./local_count');
const test = require('./test');

const router = new express.Router();
router.use('/confirmed', confirmed);
router.use('/hospital_check', hospital_check);
router.use('/noti', noti);
router.use('/reload', reload);
router.use('/scan', scan);
router.use('/state', state);
router.use('/login', login);
router.use('/count', count);
router.use('/local',local);
router.use('/test',test);
module.exports = router;



