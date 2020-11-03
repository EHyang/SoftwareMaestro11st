/*
2020-10-07 태양

각종 코드 확인용 js파일임.
*/

var express = require('express');
var request = require('request');
//var xml2js = require('xml2js');
//var parser = new xml2js.Parser();
var db = require('../dbconfig');
const cron = require('node-cron');
var axios = require('axios');
var cheerio = require('cheerio');

var router = express.Router();

// cron.schedule('* * * * *', async () => {
//   var time = new Date();
//
//   db.mysql.query("update tt set time = ? where num = 1", time, function(err, result) {
//     if (err) {
//       console.log("input failed");
//     } else {
//       console.log("input now   " + time);
//     }
//   });
//
//   let id = 1;
//
//   db.mysql.query("delete from hospital", function(err, result) {
//     if (err) {
//       console.log("delete 오류");
//     } else {
//       console.log("reset 완료");
//     }
//   }); // delete db -- end
//
//   const kakaoGet = async hospname => {
//     var insert_sql = "insert into hospital (num, name, x, y) values(?,?,?,?)";
//     var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
//     var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
//     queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
//     queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(hospname);
//
//     await request({
//       url: url + queryParams,
//       method: 'GET',
//       headers: {
//         'Authorization': 'KakaoAK fe7467539d84c3bb76f33d417a5399a4'
//       }
//     }, async function(err, response, body) {
//       var js = JSON.parse(body);
//       var data = js['documents'];
//       var param = [id++, hospname, data[0]['x'], data[0]['y']];
//       //console.log(id + " " + data[0]['place_name'] + " " + data[0]['x'] + " " + data[0]['y']);
//
//       await db.mysql.query(insert_sql, param, function(err, result) {
//         if (err) {
//           console.log("DB input err" + err);
//         } else {
//           //console.log(hospname + " DB input");
//         }
//       }); // insert db -- end
//     }); // request -- end
//   }; // kakaoGet -- end
//
//   const findStar = async str => {
//     if (str.indexOf('*') !== -1) {
//       str = str.substr(0, str.indexOf('*'));
//     }
//     await kakaoGet(str);
//   }; // findStar -- end
//
//   const getHtml = async number => {
//     console.log(number + "번째 함수 응답");
//
//     await axios.get(`https://www.mohw.go.kr/react/ncov/selclinic04ls.jsp?page=${number}`).then(html => {
//       const $ = cheerio.load(html.data);
//       const $bodyList = $("table.co_tb_base tbody.tb_center").children("tr");
//       $bodyList.each(async function(i, elem) {
//         if ($(this).find('td.name strong').text()) {
//           await findStar($(this).find('td.name strong').text()) + '<br>';
//         } else {
//           console.log("ㄴㄴ");
//         }
//       }); // each -- end
//       // if (number === 30) {
//       //   res.redirect('/hospital_check');
//       // }
//     }); // then -- end
//   }; // getHtml -- end
//
//   for (var i = 1; i <= 30; i++) {
//     console.log(i + "번째 함수 호출");
//     await getHtml(i);
//   }
//
// });



router.get('/', async function(req, res) {
  // var show = "<html><head><title>시발...</title></head><body><table><th>num</th><th>name</th><th>x</th><th>y</th>";
  // await db.mysql.query("select * from hospital", function(err, rows, fields) {
  //   for (var i = 0; i < rows.length; i++) {
  //     show += "<tr>";
  //     show += "<td>" + rows[i]['num'] + "</td>";
  //     show += "<td>" + rows[i]['name'] + "</td>";
  //     show += "<td>" + rows[i]['x'] + "</td>";
  //     show += "<td>" + rows[i]['y'] + "</td>";
  //     show += "</tr>";
  //   }
  //   show += "</table></body></html>";
  //   res.send(show);
  // });

});

module.exports = router;
