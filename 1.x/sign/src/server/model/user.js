'use strict'

const mongoose = require('mongoose')
const co = require('co')
const tool = require('../common/tool')
const Schema = mongoose.Schema

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  nick: String,
  password: String,
  role: {
    type: Number,
    default: 1 // 管理员 >=50
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

schema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next()
  }
  co.wrap(function * () {
    let pwdHash = yield tool.bhash(this.password, 10)
    this.password = pwdHash
  }).call(this).then(next).catch(next)
})

schema.methods = {
  comparePassword: function (pwd) {
    return tool.bcompare(pwd, this.password)
  }
}

schema.statics = {
  findByLogin: function * (email, pwd) {
    let user = yield this.findOne({
      email: email
    }).exec()
    if (!user) {
      throw new Error('user no found')
    }
    if (!(yield user.comparePassword(pwd))) {
      throw new Error('password does not match')
    }
    user = user.toJSON()
    delete user.password
    return user
  },

  findAll: function () {
    return this.find().exec()
  },

  findProfile: function (id) {
    return this.findOne({_id: id}).select('-password').exec()
  },

  updateByIdAndReturnNewDoc (id, doc) {
    let options = { new: true, select: '-password' } //  true to return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ _id: id }, doc, options).exec()
  }
}

module.exports = mongoose.model('User', schema)
