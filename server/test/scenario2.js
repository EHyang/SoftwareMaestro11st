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

describe('scenario 2', ()=> {

  /**
   * @type {http.Server}
   */
  let server;
  const testSuite = {
    user1: {
      gid: 'gid1',
      token: 'token1',
    },
    user2: {
      gid: 'gid2',
      token: 'token2',
    },
    scans: [
    ]
  }

  before(()=>{
    server=app.listen(8080);
  })

  it('should reload', async ()=>{
    console.debug('clearing tables...');
    const res = await api.reload();
    res.ok.should.be.true;
    return;
  })

  it('should login user 1', async ()=>{
    const { gid, token } = testSuite.user1;
    const res = await api.login(gid, token);
    res.ok.should.be.true;
    testSuite.user1.scan_key = res.body.res;
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const { gid, token } = testSuite.user2;
    const res = await api.login(gid, token);
    res.ok.should.be.true;
    testSuite.user2.scan_key = res.body.res;
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 1 with user 2', async ()=>{
    testSuite.scans.push({ my_key: testSuite.user1.scan_key,scan_key: testSuite.user2.scan_key, scan_time:Date.now() })
    const res = await api.scan(testSuite.scans);
    res.ok.should.be.true;
    // res.body.res.should.equal('0');
    return;
  })

  it('should confirm user 1', async()=>{
    const res = await api.confirm(testSuite.user1.scan_key);
    console.debug(res.body);
    res.ok.should.be.true;
    res.body.res.should.equal(0);
    return;
  })

  it('is true that user 1 was confirmed', async () => {
    const res = await api.state(testSuite.user1.scan_key);
    res.body.res.should.equal(2);
  })

  it('is true that user 2 has contact', async () => {
    const res = await api.state(testSuite.user2.scan_key);
    res.body.res.should.equal(1);
  })

  after(()=>{
    console.debug('test done');
    server.close();
  })
});