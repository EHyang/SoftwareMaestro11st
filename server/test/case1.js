const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');
const routes = require('./routes');

chai.use(chaiHttp);
chai.should();

describe('the dahda server', ()=> {

  /**
   * @type {http.Server}
   */
  let server;

  before(()=>{
    server=app.listen(8080);
  })

  it('should listen on index route', async ()=>{
    const res = await chai.request(app).get(routes.root);
    res.ok.should.be.true;
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});