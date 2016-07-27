require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest-as-promised')
var Pet = require(__server + '/models/pet.js')

describe("Pet Model", function() {

  // Promise coroutines
  it_("creates and persists data", function * () {
    var petAttrs = { name: 'Scooby', species: 'cat' }

    var newPet = yield Pet.create(petAttrs)
    expect( newPet.id ).to.be.a('number')
    expect( newPet.name ).to.equal('Scooby')
    expect( newPet.species ).to.equal('cat')

    var allPets = yield Pet.all()
    expect( allPets.length ).to.equal(1)
    expect( allPets[0].id ).to.equal( newPet.id )
  })
})
