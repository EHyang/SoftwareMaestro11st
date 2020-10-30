/*
2020-10-07 태양
hospital_crawling.js 는 매일 특정 시간마다 동작하도록 설정해야함.
동작이후에는 임시로 hospital_check 를 통해 데이터베이스에 저장된 값을 확인 할 수 있도록 설정해둠.

- xml2js 는 사용하지 않음

2020-10-10 태양
hospital_crawling.js 는 node-cron 을 사용하여 특정 시간 마다 동작하도록 설정함.
기존 res.redirect를 통해 hostial_check로 넘어갔던 방법대신, 크롤링을 통해 데이터 베이스에 직접 추가하도록 설정하였다.

cron
* * * * * * 매초
* * * * * 매분
* * * * 매시간
* * * 매일
* * 매달

2020-10-23 태양
코드 정리, log 삭제

2020-10-30 태양
접근하는 함수 횟수 증가
*/

var express = require('express');
var request = require('request');
//var xml2js = require('xml2js');
//var parser = new xml2js.Parser();

var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../dbconfig');
var cron = require('node-cron');

cron.schedule('0 * * * *', async () => {
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
    var insert_sql = "insert into hospital (num, name, x, y) values(?,?,?,?)";
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
      var param = [id++, hospname, data[0]['x'], data[0]['y']];
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
}); // cron -- end
