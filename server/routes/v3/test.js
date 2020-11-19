/*
2020-11-06 태양
- 새로운 파일 생성
- 확진자 수 파악
*/


/**
*
*paths:
*  /test/:
*    post:
*      tags:
*      - "api"
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

router.get('/', async function (req, res) {
  //var id = req.body.id;
var stat;
    db.mysql.query('select state from members where my_key = "304eeda3c173"', function(err,rows){
      stat = rows[0]['state'];
      //console.log(stat);
          
  if(stat === 0) res.send("000");
  else if(stat === 1) res.send("1111");
  else if(stat === 2) res.send("2222");
    });


 // res.json({'id':id});


});

module.exports = router;
