'use strict';

const config = require('../mocha.config');
const agent = config.agent;

// const userHelper = require('../helper/user');

describe('user controller', function() {
  describe('Auth user', function() {
    it('GET /profile should be 200', function(done) {
      agent
        .get('/profile')
        .expect(200)
        .end(done);
    });
  });

  describe('Auth Admin', function() {
    it('GET /user/all', function() {});
  });
});

