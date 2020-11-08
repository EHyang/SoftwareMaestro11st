require('./init');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const http = require('http');
const routes = require('./routes');
const api = require('./api');

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
    const res = await api.reload();
    res.ok.should.be.true;
    return;
  })

  it('should login user 1', async ()=>{
    const res = await api.login('gid1', 'mac1');
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should login user 2', async ()=>{
    const res = await api.login('gid2', 'mac2');
    res.ok.should.be.true;
    console.log(res.body);
    // res.body.res.should.equal('0');
    return;
  })

  it('should scan user 1 with user 2', async ()=>{
    const res = await api.scan('gid1', 'gid2', Date.now());
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