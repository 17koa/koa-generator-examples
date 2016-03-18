/* eslint-env mocha */
'use strict'

process.env.NODE_ENV = 'test'

const supertest = require('co-supertest')
const app = require('../../src/server/app')
const config = require('../../src/server/config')

const port = config.app.port
const baseUrl = 'http://localhost:' + port

exports.baseUrl = baseUrl
exports.supertest = supertest
exports.request = supertest(baseUrl)
// agent: admin areadly login
exports.agent = supertest.agent(baseUrl)

before(function * (done) {
  yield app.init()
  console.log('test is listening port: ' + port)

  const userHelper = require('./helper/user')
  yield userHelper.create
  // admin login
  userHelper.signAgent(exports.agent, done)
})

after(function * (done) {
  const databaseHelper = require('./helper/database')
  yield databaseHelper.drop

  app.server.close(done)
  console.log('test closed server and exit!')
})
