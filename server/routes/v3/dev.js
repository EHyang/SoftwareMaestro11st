/*
2020-11-05 현우
- 추가. set, reload 등 개발 편의 api들 통합
- TODO: 개발중에만 돌 수 있게 하기
*/

const express = require('express');
const db = require('@db');

const router = express.Router();


router.get('/reload', function(req, res) {
    // console.log('cleaning tables...');
    
    var drop_scans_sql = 'truncate scan';
  
    db.mysql.query(drop_scans_sql, [], function(err, rows, fields) {
      if (err) {
        // console.log('166 err :' + err);
        res.json({
          'res': '-1'
        });
        return;
      } else {
            
        var drop_scans_sql = 'truncate members';
  
        db.mysql.query(drop_scans_sql, [], function(err, rows, fields) {
          if (err) {
            // console.log('166 err :' + err);
            res.json({
              'res': '-1'
            });
            return;
          } else {
            // // console.log(rows);
            res.sendStatus(200);
          } // else -- end
        }); // login_sql db -- end
      } // else -- end
    }); // login_sql db -- end
  
    
  }); // router -- end

router.post('/set', function(req, res, next) {
    // console.log(process.env);
    // console.log('call set!');
    // console.log(req.body);
    var my_key = req.body.my_key;
    var level = req.body.level;
    var update_sql = `update members set state = ${level},degree=0 where my_key = ?`;
    db.mysql.query(update_sql, my_key, function(err, result) {
      if (err) {
        // console.log(err);
        //res.json({'res':'0'});
      }
      // console.log('member state update success!');
      res.json({'res':'0'});
    });
  
});


router.post('/state', function(req, res, next) {
    // // console.log(req);
    
    // console.log(req.body);
    var my_key = req.body.my_key;
    var select_sql = 'select state from members where my_key = ?';
    try {
      db.mysql.query(select_sql, my_key, function(err, rows, fields) {
        if (err) {
          // console.log(err);
          res.json({'res':'0'});
          return;
        }
        // console.log('select success!');
        res.json({'res':rows[0].state});
      });
      
    } catch (error) {
      
    }
});

router.get('/state/all', function(req, res, next) {
    // // console.log(req);
    
    // console.log(req.body);
    var my_key = req.body.my_key;
    var select_sql = 'select * from members';
    try {
      db.mysql.query(select_sql, my_key, function(err, rows, fields) {
        if (err) {
          // console.log(err);
          res.json({'res':'0'});
          return;
        }
        // console.log('select success!');
        res.json({'res':rows});
      });
      
    } catch (error) {
      
    }
  
});


router.get('/send-fcm', function (req, res) { 
  
  var message = {
    to: 'eya8PsfBT-OoOaWLUjLo8u:APA91bGtgaWqU_dPpihZg6wSBO6mvU45cZCj6T5NeroZDHPuphqvATM6rT6S5hV8vZCkQN3H7UtneCuKAUkKNdWikX8YVQ7-QYR5Tepv7yujNk9trC5UTxvEAJU_lq8cm7YoicCm8HRj',
    collapse_key: 'dev',
    delay_while_idle: true,
    // notification: {
    //   title: 'noti-title',
    //   body: 'Hi thereadsfsdsdf~'
    // },

    data: {
      title: '당신은 확진자와 접촉하였습니다.',
      body: '접촉 위치를 확인하세요',
      time:'123123',
    }
  };
  fcm.send(message, function(err, response) {
    if (err) {
      logger(err);
      logger("에러나써");
    } else {
      logger("잘가써");
    }
  });
  res.json({res:0})
})

module.exports = router;

