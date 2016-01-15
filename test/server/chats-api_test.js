var request = require('supertest')
var routes = require(__server + '/apis/chats-api.js')

describe("Chats API", function() {

  var app = TestHelper.createApp()
  app.use('/chats', routes)
  app.testReady()

  describe("GET /chats", function () {

    it("start with zero chats", function() {

      return request(app)
        .get('/chats')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.deep.equal([])
        })
    })
  })


  describe("POST /chats", function () {

    it_("creates a chat", function * () {

      yield request(app)
        .post('/chats')
        .send({ content: 'hello!' })
        .expect(201)

      yield request(app)
        .get('/chats')
        .expect(200)
        .expect(function(response) {
          var chats = response.body
          expect(chats.length).to.equal(1)
          expect(chats[0].content).to.equal('hello')
          expect(chats[0].id).to.be.truthy
        })
    })

  })

})
