
var store = []
var idCounter = 1

var Pet = {}

Pet.all = function () {
  return Promise.resolve(store)
  // return knex('pets').select('*').limit(25)
}

Pet.create = function (attrs) {
  var pet = Object.assign({}, attrs, {
    id: idCounter,
    likeCount: 0,
  })
  idCounter += 1

  store.push(pet)
  return Promise.resolve(pet)
}

Pet.like = function (petId) {
  console.log("Pet store:", store)
  var pet = store.find( pet => pet.id === petId )
  if ( pet ) {
    console.log("Found pet:", pet)
    pet.likeCount += 1
    return Promise.resolve( pet )
  }
  else {
    console.log("Did not find pet for id:", petId)
    return Promise.reject( new Error('no such pet: id=' + petId) )
  }
}


module.exports = Pet
