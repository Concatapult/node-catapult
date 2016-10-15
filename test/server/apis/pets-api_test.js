require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest-as-promised')
var routes = require(__server + '/apis/pets-api.js')

describe("Pets API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it_("creates and gets all pets", function * () {
    var newPet;

    yield request(app)
      .post('/pets')
      .send({ name: 'Scooby', species: 'cat' })
      .expect(201)
      .expect(function(response) {
        newPet = response.body

        expect( newPet.id ).to.be.a('number')
        expect( newPet.name ).to.equal('Scooby')
        expect( newPet.species ).to.equal('cat')
      })

    yield request(app)
      .get('/pets')
      .expect(200)
      .expect(function (response) {
        var pets = response.body
        expect( pets.length ).to.equal(1)
        expect( pets[0].id ).to.equal( newPet.id )
      })
  })
})
