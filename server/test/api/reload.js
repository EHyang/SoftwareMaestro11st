const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const http = require('http');
const routes = require('../routes');

chai.use(chaiHttp);
chai.should();

async function reload(){
    return await chai.request(app).get(routes.reload);
}

module.exports = reload;
