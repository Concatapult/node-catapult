require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest-as-promised')
var routes = require(__server + '/apis/pets-api.js')

var Pet = require(__server + '/models/pet')


describe("Pets API", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()


  it_("returns all pets", function * () {
    yield Pet.create({ name: 'fido' })

    yield request(app)
      .get('/')
      .expect(function (response) {
        var pets = response.body
        expect(pets).to.have.length( 1 )
      })
  })

  it_("creates a pet", function * () {

    yield request(app)
      .post('/')
      .send({ name: 'fido' })
      .expect(function (response) {
        var pet = response.body
        expect( pet.name ).to.equal('fido')
        expect( pet.id ).to.not.equal(undefined)
        expect( pet.likeCount ).to.equal(0)
      })
  })

  it_("likes a pet", function * () {
    var originalPet = yield Pet.create({ name: 'fido' })

    yield request(app)
      .post(`/${ originalPet.id }/like`)
      .expect(200)
      .expect(function (response) {
        var pet = response.body
        expect( pet.id ).to.equal( originalPet.id )
        expect( pet.likeCount ).to.equal( 1 )
      })
  })

  it_("handles missing pets", function * () {

    yield request(app)
      .post(`/123/like`)
      .expect(400)
      .expect(function (response) {
        var error = response.body
        expect( error.reason ).to.match(/no such pet/)
      })
  })

})
