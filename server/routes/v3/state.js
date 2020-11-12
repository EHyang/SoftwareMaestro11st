/*
2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- v2 api 추가 버전 병합
- dbconfig 로드 스크립트 사용
- members 테이블 사용

2020-11-12 태양
- Swagger 추가
*/

/**
*@swagger
*paths:
*  /state/:
*    post:
*      tags:
*      - "Api"
*      summary: "Retrieves state of a user."
*      description: ""
*      parameters:
*      - in: body
*        name: Your Key
*        description: "Your Key"
*        schema:
*          $ref: '#/definitions/My_key'
*      responses:
*        "200":
*          description: "Success"
*          schema:
*            $ref: '#/definitions/Success'
*        "400":
*          description: "Failed"
*          schema:
*            $ref: '#/definitions/Fail'
*
*definitions:
*  My_key:
*    type: object
*    required:
*    - my_key
*    properties:
*      my_key:
*        type: "string"
*        example: "50324cce055f"
*  Success:
*    type: object
*    required:
*    - res
*    properties:
*      res:
*        type: "string"
*        example: "Your state ( 0, 1, 2 )"
*  Fail:
*    type: object
*    required:
*    - res
*    properties:
*      res:
*        type: "string"
*        example: "-1"
*/

var express = require('express');
var db = require('@db');

var router = express.Router();

router.post('/', function(req, res, next) {
  // console.log(req);
  console.log(req.body);
  var my_key = req.body.my_key;
  var select_sql = 'select state from members where my_key = ?';
  db.mysql.query(select_sql, my_key, function(err, rows, fields) {
    try {
      if(err){
        throw err;
      }

      console.log('select success!');
      res.json({'res':rows[0].state});
    } catch (err) {
      console.log(err);
      res.json({'res':'0'});
      return;
    }
  });
});

module.exports = router;