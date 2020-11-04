const express = require('express');
const confirmed = require('./confirmed');
const hospital_check = require('./hospital_check');
const noti = require('./noti');
const reload = require('./reload');
const scan = require('./scan');
const state = require('./state');

const router = new express.Router();
router.use('/confirmed', confirmed.route());
router.use('/hospital_check', hospital_check.route());
router.use('/noti', noti.route());
router.use('/reload', reload.route());
router.use('/scan', scan.route());
router.use('/state', state.route());

module.exports = router;



