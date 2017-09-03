const assert = require('chai').assert;
const request = require('supertest');

describe('Load the express server', function () {
  let server = null;
  beforeEach(function () {
    server = require('./app');
  });
  afterEach(function () {
    server.close();
  });
  it('404 at root', function testSlash(done) {
  request(server)
    .get('/')
    .expect(404, done);
  });
  it('404 at /foo/bar', function testBadPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('200 at /api/v0/zillow/:address/:cityStateZip', function testBadPath(done) {
    request(server)
      .get('/api/v0/zillow/bad%20address/bad%20city')
      .expect(200, done);
  });
  it('ZPID=25129240 at /api/v0/zillow/939%20S%20Pepper%20St/Anaheim,%20CA,%20United%20States', function testBadPath(done) {
    request(server)
      .get('/api/v0/zillow/939%20S%20Pepper%20St/Anaheim,%20CA,%20United%20States')
      .expect(200)
      .then(response => {
        zpid: [ '25129240' ]
        assert(response.body.zpid[0], 251292400);
        done();
      });
  });
});