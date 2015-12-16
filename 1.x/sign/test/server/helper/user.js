
'use strict';

const PROFILE = [
  {
    email: 'admin@test.com',
    name: '阿轩',
    password: '123456',
    role: 51
  }, 
  {
    email: 'user1@test.com',
    realname: '轩1',
    password: '123456'
  }, 
  {
    email: 'user2@test.com',
    name: '轩2',
    password: '123456'
  }, 
  {
    email: 'user3@test.com',
    name: '轩3',
    password: '123456'
  }
];

exports.PROFILE = PROFILE;

exports.create = function* () {
  const User = require('mongoose').model('User');
  yield User.create(PROFILE);
};

exports.signAgent = function(agent, done) {
  const user = {
    email: 'admin@test.com',
    password: '123456'
  }
  agent
    .post('/login')
    .send(user)
    .expect(200)
    .end(done);
};

