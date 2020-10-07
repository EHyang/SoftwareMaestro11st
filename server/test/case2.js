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

  it('should provide login route', async ()=>{
    const res = await chai.request(app).post('/login').send({
      google_id: 'gid1',
      my_mac: 'mac1'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});