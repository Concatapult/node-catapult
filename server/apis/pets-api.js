var express = require('express')


var PetsAPI = express.Router()

PetsAPI.get('/', function(req, res) {
  Pet.all()
    .then(function(pets) {
      res.send(pets)
    })
})


var petStore = []
var Pet = {}
var idCounter = 10

Pet.create = function (attrs) {
  attrs.id = (idCounter += 1)
  petStore.push(attrs)
  return Promise.resolve(attrs)
}

Pet.validate = function (attrs) {
  return Joi.validate(attrs, mySchema)
}

Pet.all = function () {
  return Promise.resolve(petStore)
}


PetsAPI.post('/', function(req, res) {
  Pet.create(req.body)
    .then(function(newPet) {
      res.status(201).send(newPet)
    })
})




module.exports = PetsAPI
