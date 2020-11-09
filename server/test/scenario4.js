require('./init');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');
const routes = require('./routes');
const api = require('./api');

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
 * 4-c. make sure that user 2 was notified
 * 5. user 3 sign in
 * 6. scan user 2 with user 3
 * 6-c. make sure that user 2,3 was notified
 */
describe('scenario 4', ()=> {

  /**
   * @type {http.Server}
   */
  let server;
  const testSuite = {
    user1: {
      gid: 'gid1',
      token: 'token1',
      scan_key: '',
    },
    user2: {
      gid: 'gid2',
      token: 'token2',
      scan_key: '',
    },
    user3: {
      gid: 'gid3',
      token: 'token3',
      scan_key: '',
    },
    scans: [
    ]
  }

  before(()=>{
    server=app.listen(8080);
  })

  it('should reload', async ()=>{
    console.log('clearing tables...');
    const res = await api.reload();
    res.ok.should.be.true;
    return;
  })

  it('should login user 1', async ()=>{
    const { gid, token } = testSuite.user1;
    const res = await api.login(gid, token);
    res.ok.should.be.true;
    testSuite.user1.scan_key = res.body.res;
    return;
  })

  it('should login user 2', async ()=>{
    const { gid, token } = testSuite.user2;
    const res = await api.login(gid, token);
    res.ok.should.be.true;
    console.log(res.body);
    testSuite.user2.scan_key = res.body.res;
    return;
  })

  it('should confirm user 1', async()=>{
    const res = await api.confirm(testSuite.user1.scan_key);

    res.ok.should.be.true;
    res.body.res.should.equal(0);
    return;
  })

  it('is true that user 1 was confirmed', async () => {
    const res = await api.state(testSuite.user1.scan_key);
    res.body.res.should.equal(2);
  })

  it('is true that user 2 does not have contact', async () => {
    const res = await api.state(testSuite.user2.scan_key);
    res.body.res.should.equal(0);
  })

  it('should scan user 1 with user 2', async ()=>{
    const res = await api.scan([
      {my_key: testSuite.user1.scan_key,scan_key:testSuite.user2.scan_key, scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body.res.should.equal('0');
    return;
  })

  it('should make sure that user 2 has contact', async () => {
    const res = await api.state(testSuite.user2.scan_key);
    res.body.res.should.equal(1);
  })

  it('should login user 3', async ()=>{
    const { gid, token } = testSuite.user3;
    const res = await api.login(gid, token);
    res.ok.should.be.true;
    console.log(res.body);
    testSuite.user3.scan_key = res.body.res;
    return;
  })

  it('should scan user 2 with user 3', async ()=>{
    const res = await api.scan([
      {my_key: testSuite.user3.scan_key,scan_key: testSuite.user2.scan_key, scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body. res.should.equal('0');
    return;
  })

  it('should contact user 2 and user 3', async() => {
    const [res1, res2] = await Promise.all([
      api.state(testSuite.user2.scan_key),
      api.state(testSuite.user3.scan_key)
    ]);

    res1.body.res.should.equal(1);
    res2.body.res.should.equal(1);
  })

  after(()=>{
    console.log('test done');
    server.close();
    server.removeAllListeners();
  })
});