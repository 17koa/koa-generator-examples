'use strict'

const mongoose = require('mongoose')

exports.drop = function * () {
  const Models = [mongoose.model('User')]
  yield Models.map(dropCollection)
  console.info('clear db!')
}

function dropCollection (Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.remove(function (err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}
