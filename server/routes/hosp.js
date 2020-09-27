var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var router = express.Router();

router.get('/', function(req, res) {
  var hospName = [];


  var url = 'http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=ixcveqay%2F7Tr%2Fa5YB3dW3zK2O64wxILcNEyCL8l9vFfVVBpipZv99TJJ4XaVolkdhPs%2BzfBxY0bs3Gcbt668CA%3D%3D'; /* Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
  queryParams += '&' + encodeURIComponent('spclAdmTyCd') + '=' + encodeURIComponent('99');

  function get_d() {
    return new Promise(function(resolve, reject) {
      console.log("1");
      // request({
      //   url: url + queryParams,
      //   method: 'GET'
      // }, function(err, response, body) {
      //   if (body) {
      //     parser.parseString(body, function(err, result) {
      //       console.log("여까진 옴");
      //       var data = result.response.body[0].items[0].item;
      //       //console.log("이거 되따");
      //       var length = data.length;
      //       //console.log(data);
      //       var sidoNm, sgguNm, yadmNm, telno;
      //       for (var i = 0; i < length; ++i) {
      //         var spclAdmTyCd = data[i].spclAdmTyCd;
      //         if (spclAdmTyCd == '99') {
      //           //console.log(data[i].yadmNm);
      //           hospName.push(data[i].yadmNm);
      //         }
      //       }
      //     }); // parser --end
      //     resolve(hospName);
      //   }
      //   reject(new Error("zzzz"));
      // });

      hospName = ['강남구보건소','삼성서울병원','연세대학교의과대학 강남세브란스병원','강동경희대학교의대병원','강동구보건소'];
      resolve(hospName);

    });
  }



  //console.log("요기이이");
  get_d().then(function(result) {
    console.log("2");
    var to = [];

  function kakaoGet() {
    return new Promise(function(resolve, reject){
      console.log("3");
          var total = [];
        //   for (var i = 0; i < result.length; i++) {
        //       console.log("여기");
        //       var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
        //       var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
        //       queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
        //       queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(result[i]);
        // //console.log("여긴지나나");
        //
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
        //         //console.log(total);
        //       }); //request---end
        //   }
        for(var i = 0; i<3; i++)
        {
          total.push(i);
        }
      resolve(total);
    });
  }

  kakaoGet().then(function(re){
    console.log("요긴뎅...");
    console.log(re);
  });





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


  }).catch(function(err) {
    console.log(err);
  });
}); // router--end



module.exports = router;
