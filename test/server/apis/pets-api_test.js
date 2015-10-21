var request = require('supertest-as-promised')
var PetsAPI = require(__server + '/apis/pets-api')

describe("Pets API", function() {

  var app = TestHelper.createApp()
  app.use('/pets', PetsAPI)
  app.testReady()

  it("creates and retrieves a pet", function() {

    // Mocha will wait for returned promises to complete
    return request(app)
      .post('/pets')
      .send({ name: 'Tubs', species: 'cat' })
      .expect(201)
      .expect(function(response) {
        var newPet = response.body

        expect(newPet.id).to.not.be.undefined
        expect(newPet.name).to.equal('Tubs')
        expect(newPet.species).to.equal('cat')
      })
      .then(function(){

        return request(app)
          .get('/pets')
          .expect(200)
          .expect(function(response) {
            var pets = response.body
            expect(pets).to.be.an.instanceOf(Array)
            expect(pets).to.have.length(1)
            expect(pets[0].name).to.equal('Tubs')
          })
      })
  })
})
