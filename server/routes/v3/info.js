/**
 * 2020-11-16 태양
 * - 파일 생성
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

router.post('/', function (req, res) {
    var my_key = req.body.my_key;
    var my_state, my_degree;
    var state_sql = 'select state,degree from members where my_key = ?';

    db.mysql.query(state_sql, my_key, async function (err, row) {

        if (err) {
            console.log(err);
        } else {
            my_state = row[0]['state'];
            my_degree = row[0]['degree'] + 1;
           
            if (my_state === 0) {
                var today_sql = "select count(*) as today from scan where my_key = ? and DATE(scan_time) = DATE(now())";
                var all_sql = "select count(*) as day from scan where my_key = ?";

                const a = new Promise((resolve,reject)=>{
                    db.mysql.query(today_sql,my_key,function(err,rows){
                        resolve(rows[0]['today']);
                    });
                });

                const b = new Promise((resolve,reject)=>{
                    db.mysql.query(all_sql,my_key,function(err,rows){
                        resolve(rows[0]['day']);
                    });
                });


                var first = await a;
                var second = await b;

                res.json({
                    "first":first,
                    "second":second
                });
            } else if (my_state === 1) {
                res.json({
                    "first":"미구현",
                    "second":"미구현"
                });
                
            } else if (my_state === 2) {
                res.json({
                    "first":my_degree,
                    "second":0
                });
            }
        }
    });
});

module.exports = router;