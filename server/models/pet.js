var idCounter = 0
// var store = []
var store = [{ name: 'Scooby', species: 'snail' }]


var Pet = module.exports

Pet.all = function () {
  return Promise.resolve( store.slice() )
}

Pet.create = function (attrs) {
  idCounter += 1
  var newPet = Object.assign({}, attrs, { id: idCounter })

  store.push(newPet)
  return Promise.resolve(newPet)
}
