'use strict';

const User = require('../model/user');

exports.showProfile = function* () {
	let id = this.session.user._id;
	let result = yield User.findProfile(id);
	this.body = result;
};

exports.showAll = function* () {
  let result = yield User.findAll();
  this.body = result;
};

exports.edit = function() {};

exports.remove = function() {};

exports.create = function*() {
  let profile = this.request.body;
  const user = new User(profile);
  yield user.save();
  this.status = 201;
};