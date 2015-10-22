'use strict';


const mongoose = require('mongoose');
const co = require('co');
const tool = require('../common/tool');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  nick: String,
  password: String,
  role: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

schema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  co.wrap(function*() {
    let pwdHash = yield tool.bhash(this.password, 10);
    this.password = pwdHash;
  }).call(this).then(next).catch(next);
});

schema.methods = {
  comparePassword: function(pwd) {
    return tool.bcompare(pwd, this.password);
  }
};

schema.statics = {
  passwordMatches: function*(loginname, pwd) {
    let user = yield this.findOne({
      name: name
    }).exec();
    if (!user) {
      throw new Error('user no found');
    }
    if (!(yield user.comparePassword(pwd))) {
      throw new Error('password does not match');
    }
    return user;
  },

  findAll: function() {
    return this.find().exec();
  },
};

module.exports = mongoose.model('User', schema);

