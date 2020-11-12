/*
2020-10-07 태양
scan.js을 사용하지 않기 위해 만듬.
my_key는 현재 google_id 를 사용함.

2020-10-23 태양
코드 정리, log 삭제

2020-11-03 현우
- dbconfig-load 사용

2020-11-12 태양
- Swagger 추가
*/

/**
*@swagger
*paths:
*  /scan/:
*    post:
*      tags:
*      - "Api"
*      summary: "Update or Create new scan record"
*      description: ""
*      parameters:
*      - in: body
*        name: ScanSet
*        description: "Your Key, Scan key and Scan time"
*        schema:
*          type: array
*          items:
*            $ref: '#/definitions/ScanSet'
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
*  ScanSet:
*    type: object
*    required:
*    - my_key
*    - scan_key
*    - scan_time
*    properties:
*      my_key:
*        type: "string"
*        example: "50324cce055f"
*      scan_key:
*        type: "string"
*        example: "e94986d20a4a"
*      scan_time:
*        type: "string"
*        example: "2020-11-12 22:38:55"
*  Success:
*    type: object
*    required:
*    - res
*    properties:
*      res:
*        type: "string"
*        example: "0"
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

router.post('/', function(req, res) {
  //  var my_key = req.body[0].my_key;
  var my_key;
  var scan = req.body;
  var data = req.body;
  var length = scan.length;
  var insert_sql = "insert into scan (my_key, scan_key, scan_time) values ";

  var scan_key, scan_time;

  for (var i = 0; i < length; ++i) {
    my_key = data[i].my_key;
    scan_key = data[i].scan_key;
    scan_time = data[i].scan_time;
    insert_sql += "('" + my_key + "', '" + scan_key + "', '" + scan_time + "'),";
  }

  insert_sql = insert_sql.slice(0, -1);

//  console.log(insert_sql);

  db.mysql.query(insert_sql, function(err, result) {
    if (err) {
      console.log(err);
      res.json({
        'res': '-1'
      });
    }
    console.log('scandata input success!');
    res.json({
      'res': '0'
    });
  }); // insert db -- end

}); // router -- end

module.exports = router;
