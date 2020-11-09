const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const http = require('http');
const routes = require('../routes');

chai.use(chaiHttp);
chai.should();

async function login(google_id, token){
    return await chai.request(app).post(routes.login).send({
        google_id,
        token
    });
}

module.exports = login;
