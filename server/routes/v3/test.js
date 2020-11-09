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

router.get('/', async function (req, response) {

  console.log("hello");

    var time = new Date();
  
    db.mysql.query("update tt set time = ? where num = 1", time, function(err, result) {
      if (err) {
        console.log("now time input failed");
      } else {
        console.log("input now   " + time);
      }
    });
  
    let id = 1;
  
    db.mysql.query("delete from hospital", function(err, result) {
      if (err) {
        console.log("hospital table data delete error");
      } else {
        console.log("hospital table reset success");
      }
    }); // delete db -- end
  
    const kakaoGet = async hospname => {
      var insert_sql = "insert into hospital (num, name, x, y, phone) values(?,?,?,?,?)";
      var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
      var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
      queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
      queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(hospname);
  
      await request({
        url: url + queryParams,
        method: 'GET',
        headers: {
          'Authorization': 'KakaoAK fe7467539d84c3bb76f33d417a5399a4'
        }
      }, async function(err, response, body) {
        var js = JSON.parse(body);
        var data = js['documents'];
        var param = [id++, hospname, data[0]['x'], data[0]['y'], data[0]['phone']];
        //console.log(id + " " + data[0]['place_name'] + " " + data[0]['x'] + " " + data[0]['y']);
  
        await db.mysql.query(insert_sql, param, function(err, result) {
          if (err) {
            //console.log("DB input err" + err);
          } else {
            //console.log(hospname + " DB input");
          }
        }); // insert db -- end
      }); // request -- end
    }; // kakaoGet -- end
  
    const findStar = async str => {
      if (str.indexOf('*') !== -1) {
        str = str.substr(0, str.indexOf('*'));
      }
      await kakaoGet(str);
    }; // findStar -- end
  
    const getHtml = async number => {
      console.log(number + "번째 함수 응답");
  
      await axios.get(`https://www.mohw.go.kr/react/ncov/selclinic04ls.jsp?page=${number}`).then(html => {
        const $ = cheerio.load(html.data);
        const $bodyList = $("table.co_tb_base tbody.tb_center").children("tr");
        $bodyList.each(async function(i, elem) {
          if ($(this).find('td.name strong').text()) {
            await findStar($(this).find('td.name strong').text()) + '<br>';
          } else {
            console.log("crawling failed");
          }
        }); // each -- end
        // if (number === 30) {
        //   res.redirect('/hospital_check');
        // }
      }); // then -- end
    }; // getHtml -- end
  
    for (var i = 1; i <= 31; i++) {
      console.log(i + "번째 함수 호출");
      await getHtml(i);
    }
});

module.exports = router;