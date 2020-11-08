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

describe('the dahda server', ()=> {

  /**
   * @type {http.Server}
   */
  let server;

  before(()=>{
    server=app.listen(8080);
  })

  it('should reload', async ()=>{
    // console.debug('clearing tables...');
    const res = await api.reload();
    res.ok.should.be.true;
    return;
  })

  it('should login user 1', async ()=>{
    const res = await api.login('gid1', 'token1');
    res.ok.should.be.true;
    // console.debug(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const res = await api.login('gid2', 'token2');
    res.ok.should.be.true;
    // console.debug(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 3', async ()=>{
    const res = await api.login('gid3', 'token3');
    res.ok.should.be.true;
    // console.debug(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 1 with user 2', async ()=>{
    const res = await api.scan([
      {my_key: 'gid1',scan_key:'gid2', scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 2 with user 3', async ()=>{
    const res = await api.scan([
      {my_key: 'gid3',scan_key:'gid2', scan_time:Date.now()}
    ]);
    res.ok.should.be.true;
    // res.body.res.should.equal('0');
    return;
  })

  it('should confirm user 1', async()=>{
    const res = await api.confirm('gid1');

    res.ok.should.be.true;
    res.body.res.should.equal(0);
    return;
  })
  
  it('is true that user 1 was confirmed', async () => {
    const res = await api.state('gid1');
    res.body.res.should.equal(2);
  })

  it('is true that user 2 has contact', async () => {
    const res = await api.state('gid2');
    res.body.res.should.equal(1);
  })

  it('is true that user 3 has contact', async () => {
    const res = await api.state('gid3');
    res.body.res.should.equal(1);
  })

  after(()=>{
    // console.debug('test done');
    server.close();
    server.removeAllListeners();
  })
});