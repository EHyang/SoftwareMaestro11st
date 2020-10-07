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
    const res = await chai.request(app).post('/login').send({
      google_id: 'gid1',
      token: 'token1'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const res = await chai.request(app).post('/login').send({
      google_id: 'gid2',
      token: 'token2'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 1 with user 2', async ()=>{
    const res = await chai.request(app).post('/input').send([
      {my_key: 'gid1',scan_key:'gid2', scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body.res.should.equal('0');
    return;
  })

  it('should store new confirmed user', async()=>{
    const res = await chai.request(app).post('/confirmed').send({
      my_key: 'gid1'
    });

    console.log('scenario 2 result');
    console.log(res.body);
    res.ok.should.be.true;
    res.body.ok.should.be.false
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});