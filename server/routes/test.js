var express = require('express');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


var router = express.Router();

var hospName = [];
var name = [];

async function hello() {
  //return new Promise(function(resolve, reject){
  console.log("2");
  name = [];
  console.log("나아직 안했다.");
  // var url = 'http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList';
  // var queryParams = '?' + encodeURIComponent('ServiceKey') + '=ixcveqay%2F7Tr%2Fa5YB3dW3zK2O64wxILcNEyCL8l9vFfVVBpipZv99TJJ4XaVolkdhPs%2BzfBxY0bs3Gcbt668CA%3D%3D'; /* Service Key*/
  // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /* */
  // queryParams += '&' + encodeURIComponent('spclAdmTyCd') + '=' + encodeURIComponent('99');
  //
  // request({
  //   url : url+queryParams,
  //   method : 'GET'
  // }, function(err,response,body){
  //   if(body){
  //     parser.parseString(body,function(err,result){
  //             var data = result.response.body[0].items[0].item;
  //             //console.log("이거 되따");
  //             var length = data.length;
  //             //console.log(data);
  //             var sidoNm, sgguNm, yadmNm, telno;
  //             for (var i = 0; i < length; ++i) {
  //               var spclAdmTyCd = data[i].spclAdmTyCd;
  //               if (spclAdmTyCd == '99') {
  //                 //console.log(data[i].yadmNm);
  //                hospName.push(data[i].yadmNm);
  //               }
  //             }
  //     });//parser--end
  //   }
  // }); // request end
  //});
  //resolve(hospName);
  hospName = ['강남구보건소', '삼성서울병원', '연세대학교의과대학 강남세브란스병원', '강동경희대학교의대병원', '강동구보건소'];

  await bye();
  //  console.log(hospName);
} //function end

// hello().then(function(result){
//   console.log("3");
//   console.log(result);
// });

async function bye() {
  console.log("3");
  console.log(hospName);
  for (var i = 0; i < hospName.length; i++) {
    await check(hospName[i]);
  }
  console.log("냐");
  console.log(name);
}

function check(ch) {
  return new Promise(function(resolve) {
    console.log("check");
    var url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    var queryParams = '?' + encodeURIComponent('page') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('size') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('query') + '=' + encodeURIComponent(ch);
    //console.log("여긴지나나");
    request({
      url: url + queryParams,
      method: 'GET',
      headers: {
        'Authorization': 'KakaoAK fe7467539d84c3bb76f33d417a5399a4'
      }
    }, function(err, response, body) {
      var js = JSON.parse(body);
      var data = js['documents'];
      var tt = [];
      tt.push(data[0]['place_name']);
      tt.push(data[0]['x']);
      tt.push(data[0]['y']);
      resolve(name.push(tt));
      //console.log(total);
    }); //request---end
  });

}

router.get('/', async function(req, res) {
  console.log("1");
  await hello();
  //console.log("4");
  //console.log(name);
  var myjson = JSON.stringify(name);
  res.json(myjson);
});

module.exports = router;
