var express = require('express')
var Pet = require('../models/pet')


var PetsAPI = express.Router()
module.exports = PetsAPI

PetsAPI.post('/pets', function (req, res) {

  Pet.create(req.body)
    .then(function (newPet) {
      res.status(201).send(newPet)
    })
    .catch(function (err) {
      // TODO: Check kind of error, maybe send back 400
      res.status(500).send(err)
    })
})


PetsAPI.get('/pets/:id', function (req, res) {

  Pet.find( req.params.id )
    .then(  respondWith(200, res) )
    .catch( Pet.NotFound, respondWith(404, res) )
    .catch( respondWith(500, res) )

    // .then(function (pet) {
    //   res.status(200).send(pet)
    // })
    // .catch( Pet.NotFound, function (err) {
    //   res.sendStatus(404)
    // })
    // .catch(function (err) {
    //   res.status(500).send(err)
    // })
})

function respondWith (statusCode, res) {
  return function (x) { res.status(statusCode).send(x) }
}
