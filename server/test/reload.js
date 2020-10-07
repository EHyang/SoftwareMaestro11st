const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');

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

  it('should reload', async ()=>{
    console.log('clearing tables...');
    const res = await chai.request(app).get('/reload');
    res.ok.should.be.true;
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});