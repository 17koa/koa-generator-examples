/* eslint-env mocha */
'use strict'

const config = require('../mocha.config')
const agent = config.agent
const request = config.request
// const userHelper = require('../helper/user')

describe('user controller', function () {
  describe('unAuth user', () => {
    it('GET /admin *unAuth* should be 401', (done) => {
      request
        .get('/admin/users')
        .expect(401)
        .end(done)
    })
  })
  describe('Auth user', function () {
    it('GET /users/profile should be 200', (done) => {
      agent
        .get('/users/profile')
        .expect(200)
        .end(done)
    })
  })

  describe('Auth Admin', function () {
    let UID
    let vUser = {
      email: 'user4@test.com',
      name: '轩4',
      password: '123456'
    }
    it('GET /admin/users should be 200', (done) => {
      agent
        .get('/admin/users')
        .expect(200)
        .end(done)
    })
    it('POST /admin/users should be 201', (done) => {
      agent
        .post('/admin/users')
        .send(vUser)
        .expect(201)
        .end((err, res) => {
          if (err) return console.error(err)
          // console.log(res.body)
          res.body.name.should.be.equal(vUser.name)
          UID = res.body._id
          done()
        })
    })
    it('PUT /admin/users/:id should be 201', (done) => {
      let newName = '轩5'
      agent
        .put(`/admin/users/${UID}`)
        .send({name: newName})
        .expect(201)
        .end((err, res) => {
          if (err) return console.error(err)
          // console.log(res.body)
          res.body.name.should.be.equal(newName)
          done()
        })
    })
    it('DELETE /admin/users/:id should be 204', (done) => {
      agent
        .delete(`/admin/users/${UID}`)
        .expect(204)
        .end(done)
    })
  })
})
