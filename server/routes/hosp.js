var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var axios = require('axios');
var cheerio =require('cheerio');

var router = express.Router();

router.get('/', async function(req, res) {
  let all = "";
  let id = 1;

  const getHtml = async number => {
    let ulList = "";
    console.log(number + "번째 함수 응답");

    await axios.get(`https://www.mohw.go.kr/react/ncov/selclinic04ls.jsp?page=${number}`).then(html => {
      const $ = cheerio.load(html.data);
      const $bodyList = $("table.co_tb_base tbody.tb_center").children("tr");
      $bodyList.each(function(i, elem) {
        if ($(this).find('td.name strong').text()) {
          ulList += $(this).find('td.name strong').text() + '<br>';
        } else {
          console.log("ㄴㄴ");
        }
      });
      all += ulList;
      if (number === 30) {
        res.send(all);
      }
    });
  };

  for (var i = 1; i <= 30; i++) {
    console.log(i + "번째 함수 호출");
    await getHtml(i);
  }

  // function kakaoGet() {
  //   return new Promise(async function(resolve, reject) {
  //     console.log("3");
  //     var total = [];
  //     let idx = 0;
  //     var hospName = [
  //       '강남구보건소*(검체채취 가능)'];
  //     hospName.forEach(i => {
  //       console.log("여기" + i);
  //       ++idx;
  //       var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
  //       var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
  //       queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
  //       queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(i);
  //       //console.log("여긴지나나");
  //
  //       request({
  //         url: url + queryParams,
  //         method: 'GET',
  //         headers: {
  //           'Authorization': 'KakaoAK fe7467539d84c3bb76f33d417a5399a4'
  //         }
  //       }, function(err, response, body) {
  //         console.log("왜안댕..." + idx);
  //         var js = JSON.parse(body);
  //         var data = js['documents'];
  //         var tt = [];
  //         console.log(data[0]['place_name']);
  //         console.log(data[0]['x']);
  //         console.log(data[0]['y']);
  //         //tt.push(data[0]['place_name']);
  //         //tt.push(data[0]['x']);
  //         //tt.push(data[0]['y']);
  //         //total.push(tt);
  //         //console.log(total);
  //       }); //request---end
  //     }); //forEach 끝임
  //     resolve(total);
  //   });
  // }
  //
  // kakaoGet().then(function(re) {
  //   console.log("요긴뎅...");
  //   console.log(re);
  // });





  //     for (var i = 0; i < result.length; i++) {
  //       console.log("여기");
  //       var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
  //       var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
  //       queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
  //       queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(result[i]);
  // //console.log("여긴지나나");
  //       request({
  //         url: url + queryParams,
  //         method: 'GET',
  //         headers: {
  //           'Authorization': 'KakaoAK fe7467539d84c3bb76f33d417a5399a4'
  //         }
  //       }, function(err, response, body) {
  //         var js = JSON.parse(body);
  //         var data = js['documents'];
  //         var tt = [];
  //         console.log(data[0]['place_name']);
  //         console.log(data[0]['x']);
  //         console.log(data[0]['y']);
  //         tt.push(data[0]['place_name']);
  //         tt.push(data[0]['x']);
  //         tt.push(data[0]['y']);
  //         total.push(tt);
  //         console.log(total);
  //       }); //request---end
  //     }
  //res.send(total)


  // }).catch(function(err) {
  //   console.log(err);
  // });
}); // router--end



module.exports = router;
