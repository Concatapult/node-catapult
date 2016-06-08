require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest-as-promised')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  // it_ converts your gen function into a (bluebird) promise coroutine
  it_("creates and retrieves a pet", function * () { // Generator function

    var pet = null

    yield request(app)
      .post('/pets')
      .send({ name: 'Fido', species: 'dog' })
      .expect(201)
      .expect(function(response) {
        pet = response.body
        expect( pet.id ).to.be.a('number')
        expect( pet.name ).to.equal('Fido')
        expect( pet.species ).to.equal('dog')
      })

    yield request(app)
      .get('/pets/' + pet.id)
      .expect(200)
      .expect(function(response) {
        var pet_2 = response.body
        expect( pet_2 ).to.deep.equal( pet )
        expect( pet_2 === pet ).to.equal(false)
      })
  })

  it_("returns a 404 for a non-existing pet", function * () {

    yield request(app)
      .get('/pets/idontexist')
      .expect(404)
  })
})
