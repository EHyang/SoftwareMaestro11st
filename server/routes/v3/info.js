/**
 * 2020-11-16 태양
 * - 파일 생성
 */

/**
 *@swagger
 *paths:
 *  /info/:
 *    post:
 *      tags:
 *      - "Api"
 *      summary: "Provides information based on the user's state"
 *      description: ""
 *      parameters:
 *      - in: body
 *        name: Your Key
 *        description: "Your Key"
 *        schema:
 *          $ref: '#/definitions/My_key'
 *      responses:
 *        "200":
 *          description: "User's State is 0(Normal)"
 *          schema:
 *            $ref: '#/definitions/state0'
 *        "201":
 *          description: "User's State is 1(Contacted)"
 *          schema:
 *            $ref: '#/definitions/state1'
 *        "202":
 *          description: "User's State is 2(Infected)"
 *          schema:
 *            $ref: '#/definitions/state2'
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
 *  state0:
 *    type: object
 *    required:
 *    - first
 *    - second
 *    properties:
 *      first:
 *        type: "string"
 *        description: "Number of people in contact during the day"
 *        example: "7"
 *      second:
 *        type: "string"
 *        description: "he total number of people in contact"
 *        example: "56"
 *  state1:
 *    type: object
 *    required:
 *    - first
 *    - second
 *    properties:
 *      first:
 *        type: "string"
 *        description: "Remaining isolation period"
 *        example: "13"
 *      second:
 *        type: "string"
 *        description: "Past isolation period"
 *        example: "1"
 *  state2:
 *    type: object
 *    required:
 *    - first
 *    - second
 *    properties:
 *      first:
 *        type: "string"
 *        description: "infection degree"
 *        example: "2"
 *      second:
 *        type: "string"
 *        example: "0"
 *  Fail:
 *    type: object
 *    required:
 *    - first
 *    - second
 *    properties:
 *      first:
 *        type: "string"
 *        example: "-1"
 *      second:
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

            res.json({
                "first": "-1",
                "second": "-1"
            })
        } else {
            my_state = row[0]['state'];
            my_degree = row[0]['degree'] + 1;

            if (my_state === 0) {
                var today_sql = "select count(*) as today from scan where my_key = ? and DATE(scan_time) = DATE(now())";
                var all_sql = "select count(*) as day from scan where my_key = ?";

                const a = new Promise((resolve, reject) => {
                    db.mysql.query(today_sql, my_key, function (err, rows) {
                        resolve(rows[0]['today']);
                    });
                });

                const b = new Promise((resolve, reject) => {
                    db.mysql.query(all_sql, my_key, function (err, rows) {
                        resolve(rows[0]['day']);
                    });
                });


                var first = await a;
                var second = await b;

                res.json({
                    "first": first,
                    "second": second
                });
            } else if (my_state === 1) {
                var isolate_sql = " select datediff(date_add(isolation, interval 14 day), isolation) as remain, datediff(now(), isolation) as total from members_dev where my_key = ?";

                const c = new Promise((resolve,reject)=>{
                    db.mysql.query(isolate_sql,my_key,function(err,rows){
                        resolve(rows[0]);
                    });
                });

                var date = await c;

                res.status(201).json({
                    "first": date['remain'],
                    "second": date['total']
                });

            } else if (my_state === 2) {
                res.status(202).json({
                    "first": my_degree,
                    "second": 0
                });
            }
        }
    });
});

module.exports = router;