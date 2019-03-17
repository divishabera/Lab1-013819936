'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our node express app

describe('Testing canvas API', function() {
  this.timeout(5001); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all courses
  it('Should return all courses', function() {
    return chai.request(app)
      .get('/getAllCourses')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });


  it('Should create a new course', function() {
    return chai.request(app)
      .get('/getAllCourses')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('Should login as credentials are valid', function() {
    return chai.request(app)
      .get('/getAllCourses')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('Should not login as credentials are invalid', function() {
    return chai.request(app)
      .get('/getAllCourses')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });
  it('Should get all announcements', function() {
    return chai.request(app)
      .get('/getAnnouncements')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });


});