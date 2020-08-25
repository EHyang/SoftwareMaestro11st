var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
// var serviceAccount = require("../../config/nice-dotda-firebase-adminsdk-36j2q-87fd7c2ee6.json");
var config = require('config');
var { encryptStringWithRsaPublicKey } = require('../util');


const models = require('../models');
const Sequelize = require('sequelize');
const { sequelize } = require('../models');

var visited={};


router.post('/', function(req, res, next) {
  console.log('test post /');
  console.debug(req.session);
  console.debug(req.body);
  var token = req.body.token;
  var key = encryptStringWithRsaPublicKey(token, "./config/server-key.pub");
  res.json({key});
});


module.exports = router;
