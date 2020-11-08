const mySql = require('mysql');
const config = require('config');

if(global.mysql != undefined){
  module.exports = { mysql, info };
  console.debug('skipping mysql loading');
  return;
}

const info = {
  host     : config.get('db.host'),
  user     : config.get('db.user'),
  password : config.get('db.password'),
  port     : config.get('db.port'),
  database : config.get('db.database')
};

console.log(info.user);

let mysql = mySql.createConnection(info);

global.mysql=mysql;
global.info=info;

module.exports = { mysql, info };
