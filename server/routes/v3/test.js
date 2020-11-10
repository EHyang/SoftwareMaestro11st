/*
2020-11-06 태양
- 새로운 파일 생성
- 확진자 수 파악
*/


/** 
*@swagger
*paths:
*  /test/:
*    post:
*      tags:
*      - "pet"
*      summary: "get your state using scan_key"
*      description: ""
*      parameters:
*      - name: "id"
*        in: "body"
*        type: "integer"
*        required: true
*      responses:
*        "200":
*          content:
*            application/json:
*              properties:
*                id:
*                  type: "string"
*          
*/



var request = require('request');
var express = require('express');
var xml2js = require('xml2js');
var db = require('@db');
var router = express.Router();
var axios = require('axios');
var cheerio = require('cheerio');

router.post('/', function (req, res) {
  var id = req.body.id;

  res.json({'id':id});


});

module.exports = router;