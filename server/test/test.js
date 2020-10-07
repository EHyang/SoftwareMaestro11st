const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');

chai.use(chaiHttp);

describe('the dahda server', ()=> {

  /**
   * @type {http.Server}
   */
  let server;

  before(()=>{
    server=app.listen(3000);
  })

  it('should listen on index route', async ()=>{
    const res = await chai.request(app).get('/')
    res.ok.should.be.true;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});