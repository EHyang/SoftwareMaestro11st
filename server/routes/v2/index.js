const express = require('express');
const confirmed = require('./confirmed');
const hospital_check = require('./hospital_check');
const noti = require('./noti');
const reload = require('./reload');
const scan = require('./scan');
const state = require('./state');

const router = new express.Router();
router.use('/confirmed', confirmed);
router.use('/hospital_check', hospital_check);
router.use('/noti', noti);
router.use('/reload', reload);
router.use('/scan', scan);
router.use('/state', state);

module.exports = router;



