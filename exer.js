const expect = require("chai").expect;
const request = require("supertest");
const server = require("../index");
var should = require("should");
const mongoose = require("mongoose");

const app = request.agent(server);

before(function(){
    mongoose.connect()
})


describe("post end point", function(){

// subscribe
  it("success should return 201", function(){
    app
    .post("/subscribe")
    .send({
      email: "luc@gmail.com"
    })
    .end((err, res)=>{
      res.status.should.equal(201);
    })
  });
 

// already subscribed
  it("Already exist should return 409", function(){
    app
    .post("/subscribe")
    .send({
      email: "luc@gmail.com"
    })
    .end((err, res)=>{
      res.status.should.equal(409);
    })

  });

})


describe("subscribers", function(){

  it("Success should return 201", function(){
    app
    .get("/subscribe")
    .end((err, res)=>{
      res.status.should.equal(201);
    })
  });

  it("No subscriber found should return 204", function(){
    app
    .get("/subscribe")
    .end((err, res)=>{
      res.status.should.equal(204);
    })
  })
})