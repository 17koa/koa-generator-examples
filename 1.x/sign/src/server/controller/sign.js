'use strict'

const User = require('../model/user')

exports.showLogin = function * () {
  this.body = 'this is a login page.'
}

exports.login = function * () {
  const email = this.request.body.email
  const password = this.request.body.password
  let user

  try {
    user = yield User.findByLogin(email, password)
  } catch (err) {
    this.throw(400, err)
  }

  // console.log(user)
  this.session.user = user // 保存在 session
  this.status = 200
}

exports.logout = function * () {
  this.session = null
  this.status = 200
}
