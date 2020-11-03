const mySql = require('mysql');
const fs = require('fs');
let db;
try {
  if(fs.existsSync(__dirname + '/dbconfig.js')){
    db=require('./dbconfig');
  }
} catch (error) {
  console.log(error);
}
console.log(db);
const info = {
  host     : process.env.DB_HOST || db.info.host,
  user     : process.env.DB_USER || db.info.user,
  password : process.env.DB_PASSWORD || db.info.password,
  port     : process.env.DB_PORT || db.info.port,
  database : process.env.DB_NAME || db.info.database
};

console.log(info.user);

let mysql = mySql.createConnection(info);

module.exports = { mysql, info };
