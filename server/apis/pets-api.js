var express = require('express')
var Pet = require('../models/pet')


var router = express.Router()

router.get('/', function (req, res) {
  Pet.all()
    .then(function (pets) {
      res.send(pets)
    })
})

router.post('/', function (req, res) {
  var petAttrs = req.body

  Pet.create(petAttrs)
    .then(function (newPet) {
      res.send(newPet)
    })
})

router.post('/:id/like', function (req, res) {
  var petId = parseInt(req.params.id)

  // Pet.like( petId, req.user.id )
  Pet.like( petId )
    .then(function (updatedPet) {
      res.send(updatedPet)
    })
    .catch(function (err) {
      res.status(400).send({ reason: err.message })
    })
})


module.exports = router
