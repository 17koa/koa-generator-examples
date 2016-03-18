/* eslint-env mocha */
'use strict'

const config = require('../mocha.config')
const request = config.request
const agent = config.supertest.agent(config.baseUrl)

const authHelper = require('../helper/user')
// const databaseHelper = require('../helper/database')

describe('SIGN controller', function () {
  describe('Login', function () {
    it('GET /login should be OK', function (done) {
      request
        .get('/login')
        .expect(200)
        .end(done)
    })

    it('POST /login with right name should be 200', function (done) {
      const profile = {
        email: 'admin@test.com',
        password: '123456'
      }
      request
        .post('/login')
        .send(profile)
        .expect(200)
        .end(done)
    })

    it('POST /login  with wrong name should be 400', function (done) {
      const profile = {
        email: 'wronguser@test.com',
        password: '123456'
      }
      request
        .post('/login')
        .send(profile)
        .expect(400)
        .end(done)
    })

    it('POST /login  with wrong password should be 400', function (done) {
      const profile = {
        email: 'admin@test.com',
        password: 'wrongpassword'
      }
      request
        .post('/login')
        .send(profile)
        .expect(400)
        .end(done)
    })
  })

  describe('Logout', function () {
    before(function (done) {
      authHelper.signAgent(agent, done)
    })

    it('POST /logout with authenticated should be OK', function (done) {
      agent
        .post('/logout')
        .expect(200)
        .end(done)
    })

    it('POST /logout without authenticated should be 401', function (done) {
      request
        .post('/logout')
        .expect(401)
        .end(done)
    })
  })
})
