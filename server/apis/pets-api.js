var express = require('express')


var PetsAPI = express.Router()

PetsAPI.get('/', function(req, res) {
  Pet.all()
    .then(function(pets) {
      res.send(pets)
    })
})

PetsAPI.post('/', function(req, res) {
  Pet.create(req.body)
    .then(function(newPet) {
      res.status(201).send(newPet)
    })
})

module.exports = PetsAPI

// ---------
// Pet Model
// ---------
// I coded this here for the lecture, but this should go in a separate file!
// Specifically: server/models/pet.js
var db = require('../lib/db')

var Pet = {}

Pet.create = function (attrs) {
  return db('pets').insert(attrs).returning('id')
    .then(function(rows) {
      var newPet = {
        name: attrs.name,
        species: attrs.species,
        id: rows[0]
      }
      return newPet
    })
}

Pet.all = function () {
  return db('pets').select('*')
}
// ---------
// ---------
