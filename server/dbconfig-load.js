const mySql = require('mysql');
const config = require('config');

if(global.mysql != undefined){
  module.exports = { mysql, info };
  console.debug('skipping mysql loading');
  return;
}

const info = {
  host     : process.env.DB_HOST || config.get('db.host'),
  user     : process.env.DB_USER || config.get('db.user'),
  password : process.env.DB_PASSWORD || config.get('db.password'),
  port     : process.env.DB_PORT || config.get('db.port'),
  database : process.env.DB_NAME || config.get('db.database')
};

console.log(info.user);

let mysql = mySql.createConnection(info);

global.mysql=mysql;
global.info=info;

module.exports = { mysql, info };
