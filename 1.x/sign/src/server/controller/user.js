'use strict'

const User = require('../model/user')

exports.showProfile = function * () {
  let id = this.session.user._id
  let result = yield User.findProfile(id)
  this.body = result
}

exports.listAll = function * () {
  let result = yield User.findAll()
  this.body = result
}

exports.create = function * () {
  let _user = this.request.body
  let result = yield User.create(_user)
  this.status = 201
  this.body = result
}

exports.update = function * () {
  let id = this.params.id
  let doc = this.request.body
  // let result = yield User.update({ _id: id }, doc).exec() // return { ok: 1, nModified: 1, n: 1 }

  let result = yield User.updateByIdAndReturnNewDoc(id, doc)
  // console.log('update result:', result)
  this.status = 201
  this.body = result
}

exports.remove = function * () {
  let id = this.params.id
  try {
    yield User.findByIdAndRemove(id).exec()
  } catch (e) {
    this.throw(400, e)
  }
  this.status = 204
}
