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

  it('should login user 1', async ()=>{
    const res = await chai.request(app).post('/testlogin').send({
      google_id: 'gid1',
      token: 'mac1'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const res = await chai.request(app).post('/testlogin').send({
      google_id: 'gid2',
      token: 'mac2'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 1 with user 2', async ()=>{
    const res = await chai.request(app).post('/input').send([
      {my_key: 'gid1',scan_mac:'gid2', scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    res.body.res.should.equal('0');
    console.log('scenario 1 result : ');
    console.log(res.body);
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});