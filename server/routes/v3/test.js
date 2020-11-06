/*
2020-11-06 태양
- 새로운 파일 생성
- 확진자 수 파악
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
          return await axios.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=");
        } catch (error) {
          console.error(error);
        }
      };
      
      getHtml()
        .then(html => {
          let ulList = [];
          const $ = cheerio.load(html.data);
          const $bodyList = $("div.rpsa_map").children("div.rpsam_graph");

          $bodyList.each(function(i, elem) {
            ulList[i] = {
                seoul: $(this).find('button[data-city=map_city1] span.num').text(),
                busan: $(this).find('button[data-city=map_city2] span.num').text(),
                daegu: $(this).find('button[data-city=map_city3] span.num').text(),
                incheon: $(this).find('button[data-city=map_city4] span.num').text(),
                gwangju: $(this).find('button[data-city=map_city5] span.num').text(),
                daejeon: $(this).find('button[data-city=map_city6] span.num').text(),
                ulsan: $(this).find('button[data-city=map_city7] span.num').text(),
                sejong: $(this).find('button[data-city=map_city8] span.num').text(),
                gyeonggi: $(this).find('button[data-city=map_city9] span.num').text(),
                gangwon: $(this).find('button[data-city=map_city10] span.num').text(),
                chungbuk: $(this).find('button[data-city=map_city11] span.num').text(),
                chungnam: $(this).find('button[data-city=map_city12] span.num').text(),
                jeonbuk: $(this).find('button[data-city=map_city13] span.num').text(),
                jeonnam: $(this).find('button[data-city=map_city14] span.num').text(),
                gyeongbuk: $(this).find('button[data-city=map_city15] span.num').text(),
                gyeongnam: $(this).find('button[data-city=map_city16] span.num').text(),
                jeju: $(this).find('button[data-city=map_city17] span.num').text(),
                quarantine: $(this).find('button[data-city=map_city18] span.num').text()
            };
          });
      
          const data = ulList.filter(n => n.seoul);
          return data;
        })
        .then(res => console.log(res));
});

module.exports = router;