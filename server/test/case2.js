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
    // const res = await chai.request(app).get(routes.reload);
    const res = await api.reload();
    res.ok.should.be.true;
    return;
  })
  
  it('should provide login route', async ()=>{
    const res = await api.login('gid1', 'mac1');
    if(res.ok==false){
      console.log(res);
    }
    res.ok.should.be.true;
    res.body.res.should.not.equal(-1)
    // res.body.res.should.equal('0');
    return;
  })

  after(()=>{
    console.log('test done');
    server.close();
  })
});