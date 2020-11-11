/*
2020-10-19 태양

매일 자정마다 데이터 베이스에서 2주지난 스캔 데이터 삭제 스케쥴 추가!

2020-11-03 현우
- dbconfig-load 사용
*/

var db = require('@db');
var cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  db.mysql.query("delete from scan where scan_time < date_sub(now(), interval 14 day)", function(err, result) {
    if (err) {
      console.log("14일 이전 데이터 삭제 실패");
    } else {
      console.log("14일 이전 데이터 삭제 성공");
    }
  });
}); // cron -- end
