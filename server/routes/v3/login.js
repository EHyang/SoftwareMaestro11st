/*
2020-10-07 태양
login.js을 대체하여 사용중임.

코드 정리 필요

2020-10-23 태양
코드 정리, log 삭제

2020-10-30 태양
- UUID4를 사용하여 개인 고유 KEY 발급
- 로그인 및 회원가입시 응답에 state 추가

2020-11-02 태양
- 일단 다시 원복

2020-11-03 현우
- v2 api 추가 버전 병합
- dbconfig 로드 스크립트 사용

2020-11-04 태양
- v2와 병합

2020-11-12 태양
- Swagger 추가
*/

/**
*@swagger
*paths:
*  /login/:
*    post:
*      tags:
*      - "Api"
*      summary: "Signs in a user. An FCM token and google id is required."
*      description: ""
*      parameters:
*      - in: body
*        name: LoginSet
*        description: "Your Google ID & FCM token value"
*        schema:
*          $ref: '#/definitions/LoginSet'
*      responses:
*        "200":
*          description: "Success"
*          schema:
*            $ref: '#/definitions/Success_login'
*        "400":
*          description: "Failed"
*          schema:
*            $ref: '#/definitions/Fail_login'
*
*definitions:
*  LoginSet:
*    type: object
*    required:
*    - google_id
*    - token
*    properties:
*      google_id:
*        type: "string"
*        example: "test@test.com"
*      token:
*        type: "string"
*        example: "eir6r6YhRZGXsjnoNCpdiA:APA91bFQInFHLqfEz8iWuaJYULdV-L66Ybv7fvNVlSpnwhkkv5JVYLXHxHoddFyuKnKcz2Ws3HKyHxrv6dotLu5Ok-xrgHizlNN81S3gSNqThSzy4oXnI0phiZ5yV19IF1afUkSMIqYR | 50324cce055f"
*  Key:
*    type: object
*    required:
*    - my_key
*    properties:
*      my_key:
*        type: "uuid"
*        example: "d05123c04cf2"
*  Success_login:
*    type: object
*    required:
*    - res
*    - state
*    properties:
*      res:
*        type: "string"
*        example: "Return User's Random key"
*      state:
*        type: "string"
*        example: "0(default) or Login user's now state(0,1,2)"
*  Fail_login:
*    type: object
*    required:
*    - res
*    - state
*    properties:
*      res:
*        type: "string"
*        example: "-1"
*      state:
*        type: "string"
*        example: "-1"
*/

var express = require('express');
var db = require('@db');
var uuid4 = require('uuid4');
var router = express.Router();

router.post('/', function(req, res) {
  //console.log('someggggggggggggggggggggggggggggggggggg');
  //console.log(req.body);
  var google_id = req.body.google_id;
  var token = req.body.token;
  var my_key;
  //var my_key = req.body.google_id;
  var login_sql = 'select * From members where google_id = ?';

  db.mysql.query(login_sql, google_id, function(err, rows, fields) {
    if (err) {
      console.log('137 err :' + err);
      res.json({
        'res': '-1',
        'state': '-1'
      });
    } else {
      //console.log(rows);
      if (rows[0] == undefined) {
        //console.log(rows[0]);

        var insert_sql = 'insert into members (google_id,token,my_key,lastest_use) values(?,?,?,?)';
        var now_time = new Date();

        var uuid = uuid4().split('-');
        my_key = uuid[4];
        //console.log(uuid);
        console.log(my_key);

        var param = [google_id, token, my_key, now_time];
        db.mysql.query(insert_sql, param, function(err, result) {
          if (err) {
            //console.log('150 err :' + err);
            res.json({
              'res': '-1',
              'state': '-1'
            });
            return;
          } else {
            console.log('sign input success!');
          }
        });
        console.log("sign up success");
        res.json({
          'res': my_key,
          'state': '0'
        });
      } else {
        console.log('login success');
        console.log(rows[0]['google_id'] + ' now state is : ' + rows[0]['state']);
        var update_sql = 'update members set lastest_use = (?) where google_id = (?)';
        var now_time = new Date();

        var param = [now_time, google_id];
        my_key = rows[0]['my_key'];
        db.mysql.query(update_sql, param, function(err, result) {
          if (err) {
            //console.log('178 err : ' + err);
            res.json({
              'res': '-1',
              'state': '-1'
            });
          } else {
            console.log('update lastest use time!');
          }
        });

        //req.session.displayname = my_mac;

        var re = [rows[0]['state'], '0'];
        res.json({
          'res': my_key,
          'state': rows[0]['state']
        });
        //  res.render('input_data');
      } // else -- end
    } // else -- end
  }); // login_sql db -- end
}); // router -- end


module.exports = router;
