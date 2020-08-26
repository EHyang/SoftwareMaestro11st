const mySql = require('mysql');

const info = {
  host     : DB domain,
  user     : admin ID,
  password : admin PW,
  port     : access port,
  database : database name
};

let mysql = mySql.createConnection(info);

module.exports = { mysql, info };
