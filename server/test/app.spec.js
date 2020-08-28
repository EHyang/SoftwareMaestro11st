// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../models');

// Configure chai
chai.use(chaiHttp);
chai.should();

function delay(interval) 
{
   return it('should delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe("index", () => {
    describe("/", () => {
        delay(1000);
        before(async function() {
            const sequelize=db.sequelize;
            // console.debug(sequelize);
            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
                return;
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
            // testSampleClass.init('mydb', done);
        });
        // Test to get all students record
        it("should login", (done) => {
             chai.request(app)
                 .post('/login')
                 .send({
                    "token":"token1",
                    "google_id":"gid1"
                })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.res.should.be.a('string');
                     done();
                  });
         });
        // // Test to get single student record
        // it("should get a single student record", (done) => {
        //      const id = 1;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('object');
        //              done();
        //           });
        //  });
         
        // // Test to get single student record
        // it("should not get a single student record", (done) => {
        //      const id = 5;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(404);
        //              done();
        //           });
        //  });
    });
});