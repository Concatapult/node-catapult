var Promise = require('bluebird')


var Pet = module.exports

var store = []
var idCounter = 10

Pet.create = function (attrs) {
  var petAttrs = {
    id: idCounter,
    name: attrs.name,
    species: attrs.species
  }
  idCounter += 1
  store.push(petAttrs)
  return Promise.resolve(petAttrs)
}

Pet.find = function (id) {
  var foundPet = store.find( pet => pet.id == id )

  if ( ! foundPet ) {
    return Promise.reject(new Pet.NotFound(id))
  }
  else {
    return Promise.resolve(foundPet)
  }
}

//
// Custom errors
//
Pet.NotFound = class NotFound extends Error {
  constructor(id) {
    super('not_found')
    this.name = 'NotFound'
    this.info = { id: id }
  }
}
