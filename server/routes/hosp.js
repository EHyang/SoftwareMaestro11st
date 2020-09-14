var express    = require('express');
var request    = require('request');
var xml2js     = require('xml2js');

//var db         = require('../dbconfig');
var router = express.Router();
var parser = new xml2js.Parser();

router.get('/', function(req,res){
  console.log("hello");
  var url = 'http://apis.data.go.kr/B551182/pubReliefHospService/getpubReliefHospList';
  var queryParams = '?' + encodeURIComponent('ServiceKey') + '=60K0Iowkgeoh%2FZ4rToc%2Brc98k9qYfiP4MP0zOYncF78iAWCUFL5DsD3Ep45dhJkonSDFLzY0OPtiAUvBIg2WjQ%3D%3D'; /* Service Key*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1079'); /* */
  queryParams += '&' + encodeURIComponent('spclAdmTyCd') + '=' + encodeURIComponent('99');

  request({
      url: url + queryParams,
      method: 'GET'
  }, function (err, response, body) {
    parser.parseString(body, function(err,result){
      var data = result.response.body[0].items[0].item;
      var length = data.length;
      var total = "";

      var sidoNm, sgguNm, yadmNm, telno;
      for (var i = 0; i < length; ++i)
      {
        var spclAdmTyCd = data[i].spclAdmTyCd;
        if('97' <= spclAdmTyCd && spclAdmTyCd <= '99')
        {
          sidoNm = data[i].sidoNm;
          sgguNm = data[i].sgguNm;
          yadmNm = data[i].yadmNm;
          telno = data[i].telno;

          total += yadmNm + " ";
          total += sidoNm + " ";
          total += sgguNm + " ";
          total += telno;
          total += '<br>';
        }
      }
      res.send(total);
    });
  });
});

module.exports = router;
