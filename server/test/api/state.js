const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const http = require('http');
const routes = require('../routes');

chai.use(chaiHttp);
chai.should();

async function state(my_key){
    return await chai.request(app).post(routes.state).send({
        my_key
    });
}

module.exports = state;
