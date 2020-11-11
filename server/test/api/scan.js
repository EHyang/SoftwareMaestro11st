const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const http = require('http');
const routes = require('../routes');

chai.use(chaiHttp);
chai.should();

async function scan(scanData){
    return await chai.request(app).post(routes.scan).send(scanData);
}

module.exports = scan;
