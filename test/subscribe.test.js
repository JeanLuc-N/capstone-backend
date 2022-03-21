// const chai = require('chai')
// const chaiHTTP = require('chai-http')
// const app = require('../index')
// const mongoose = require("mongoose");
// require("dotenv").config()

// const uri = "mongodb://localhost/capstone";


// chai.should()
// chai.use(chaiHTTP)

// before(function(done){
//   mongoose.connect(uri, function(){
//     mongoose.connection.db.dropDatabase(function(){
//       done();
//     })
//   })
// })


// describe('Subscribe API', () => {

//   it('It should subscribe', (done) => {
  
//     chai
//       .request(app)
//       .post('/subscribe')
//       .send({
//         email: "luc@gmail.com"
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });



//   it('It should not subscribe if user already subscibed', (done) => {
 
//     chai
//       .request(app)
//       .post('/subscribe')
//       .send({
//         email: "luc@gmail.com"
//       })
//       .end((err, res) => {
//         res.should.have.status(409);
//         done();
//       });
//   });

  
// })

