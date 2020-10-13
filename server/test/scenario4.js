const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

/**
 * test scenario 4
 * 0. drop tables
 * 1. user 1 sign in
 * 2. user 2 sign in
 * 3. user 1 confirmed
 * 3-c. make sure that only user 1 was notified.
 * 4. scan user 1 with user 2
 * 5. make sure that user 2 was notified
 * 6. user 3 sign in
 * 7. scan user 2 with user 3
 * 8. make sure that user 2,3 was notified
 */
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

  it('should login user 1', async ()=>{
    const res = await chai.request(app).post('/testlogin').send({
      google_id: 'gid1',
      token: 'token1'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const res = await chai.request(app).post('/testlogin').send({
      google_id: 'gid2',
      token: 'token2'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should store new confirmed user', async()=>{
    const res = await chai.request(app).post('/confirmed').send({
      my_key: 'gid1'
    });

    console.log('scenario 4-1 result');
    console.log(res.body);
    res.ok.should.be.true;
    res.body.res.should.equal(-1);
    expect(res.body.tokens).to.have.members(['token1']);
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

    console.log('scenario 4-2 result');
    console.log(res.body);
    res.ok.should.be.true;
    res.body.res.should.equal(-1);
    expect(res.body.tokens).to.have.members(['token1', 'token2']);
    return;
  })


  it('should login user 3', async ()=>{
    const res = await chai.request(app).post('/testlogin').send({
      google_id: 'gid3',
      token: 'token3'
    });
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 2 with user 3', async ()=>{
    const res = await chai.request(app).post('/input').send([
      {my_key: 'gid3',scan_key:'gid2', scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body. res.should.equal('0');
    return;
  })

  // TODO : test notifications occur without re-confirming user 1 !!
  it('should paremters', async()=>{
    const res = await chai.request(app).post('/confirmed').send({
      my_key: 'gid1'
    });

    console.log('scenario 4-3 result');
    console.log(res.body);
    res.ok.should.be.true;
    res.body.res.should.equal(-1);
    expect(res.body.tokens).to.have.members(['token1', 'token2', 'token3']);
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
    server.removeAllListeners();
  })
});