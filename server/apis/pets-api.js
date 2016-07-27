var express = require('express')
var Pet = require('../models/pet')


var PetsAPI = module.exports = express.Router()


PetsAPI.get('/pets', function (req, res) {
  Pet.all()
    .then(function (pets) {
      res.status(200).send(pets)
    })
    .catch(function (err) {
      console.log("Pet.all error:", err)
      res.status(500).send(err)
    })
})

PetsAPI.get('/pets/:id', function (req, res) {
  // Exercise to the reader
  res.status(505).send({})
})


PetsAPI.post('/pets', function (req, res) {

  Pet.create( req.body )
    .then(function (newPet) {
      res.status(201).send(newPet)
    })
    .catch(function (err) {
      console.log("Create error:", err)
      res.status(500).send(err)
    })
})
