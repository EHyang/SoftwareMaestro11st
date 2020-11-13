const mySql = require('mysql');

const info = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  port     : process.env.DB_PORT,
  database : process.env.DB_NAME
};

let mysql = mySql.createConnection(info);

module.exports = { mysql, info };
