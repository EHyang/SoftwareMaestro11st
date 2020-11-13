/**
 * 2020-11-06 태양
 * - 새로운 파일 생성
 * - 확진자 수 파악
 * 
 * 2020-11-12 태양
 * - Swagger 추가
 */

/**
*@swagger
*paths:
*  /count/:
*    get:
*      tags:
*      - "info"
*      summary: "Retrieves counts and changes of COVID-19 patients. Updates on a daily basis."
*      description: ""
*      produce:
*      - application/json
*      responses:
*        "200":
*          description: "Success"
*          schema:
*            type: array
*            items:
*              $ref: '#/definitions/Total'
*definitions:
*  Total:
*    type: object
*    required:
*    - confirmed
*    - confirmed_up
*    - examined
*    - examined_up
*    - normal
*    - normal_up
*    - dead
*    - dead_up
*    - time
*    properties:
*      confirmed:
*        type: "string"
*        example: "27,942"
*      confirmed_up:
*        type: "string"
*        example: "143"
*      examined:
*        type: "string"
*        example: "29,284"
*      examined_up:
*        type: "string"
*        example: "596"
*      normal:
*        type: "string"
*        example: "25,404"
*      normal_up:
*        type: "string"
*        example: "138"
*      dead:
*        type: "string"
*        example: "487"
*      dead_up:
*        type: "string"
*        example: "-"
*      time:
*        type: "string"
*        example: "2020.11.12. 10:01"
*/


var request = require('request');
var express = require('express');
var xml2js = require('xml2js');
var db = require('@db');
var router = express.Router();
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/', function (req, response) {
    const getHtml = async () => {
        try {
          return await axios.get("https://search.naver.com/search.naver?where=nexearch&sm=top_sly.hst&fbm=1&acr=1&ie=utf8&query=%EC%BD%94%EB%A1%9C%EB%82%98");
        } catch (error) {
          console.error(error);
        }
      };

      getHtml()
        .then(html => {
          let ulList = [];
          const $ = cheerio.load(html.data);
          const $bodyList = $("div.api_subject_bx").children("div._content");

          $bodyList.each(function(i, elem) {
            ulList[i] = {
                confirmed: $(this).find('li.info_01 p.info_num').text(),
                confirmed_up: $(this).find('li.info_01 em.info_variation').text(),
                examined: $(this).find('li.info_02 p.info_num').text(),
                examined_up: $(this).find('li.info_02 em.info_variation').text(),
                normal: $(this).find('li.info_03 p.info_num').text(),
                normal_up: $(this).find('li.info_03 em.info_variation').text(),
                dead: $(this).find('li.info_04 p.info_num').text(),
                dead_up: $(this).find('li.info_04 em.info_variation').text(),
                time: $(this).find('div.csp_infoCheck_area span._update_time').text()
            };
          });

          const data = ulList.filter(n => n.confirmed);
          return data;
        })
        .then(res => response.json(res[0]));
});

module.exports = router;
