const express = require('express');
const confirmed = require('./confirmed');
const hospital_check = require('./hospital_check');
const noti = require('./noti');
const scan = require('./scan');
const state = require('./state');
const login = require('./login');
const dev = require('./dev');

const router = new express.Router();
router.use('/confirmed', confirmed);
router.use('/hospital_check', hospital_check);
router.use('/noti', noti);
router.use('/scan', scan);
router.use('/state', state);
router.use('/login', login);
router.use('/dev', dev);

module.exports = router;



