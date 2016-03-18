'use strict'

const bcrypt = require('bcryptjs')

exports.bcompare = function (str, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(str, hash, function (err, matched) {
      if (err) {
        return reject(err)
      }
      return resolve(matched)
    })
  })
}

exports.bgenSalt = function (rounds, ignore) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(rounds, ignore, function (err, salt) {
      if (err) {
        return reject(err)
      }
      return resolve(salt)
    })
  })
}

exports.bhash = function (data, salt) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(data, salt, function (err, hash) {
      if (err) {
        return reject(err)
      }
      return resolve(hash)
    })
  })
}
