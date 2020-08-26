const mySql = require('mysql');

const info = {
  host     : 'dotda-public-db-dev.cmloh3khu1qp.ap-northeast-2.rds.amazonaws.com',
  user     : 'dotdaDBadmin',
  password : 'dotda1234',
  port     : 3306,
  database : 'somadb'
};

let mysql = mySql.createConnection(info);

module.exports = { mysql, info };
