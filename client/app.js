var m = require('mithril')

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {

  '/': {
    controller: function () {
      var ctrl = this

      m.request({ method: 'GET', url: '/pets' })
        .then(function (pets) { ctrl.pets = pets })
    },

    view: function (ctrl) {
      return m('.app', [
        m('h1', 'Pets API!'),

        ctrl.pets.map(function (pet) {
          return m('.pet', [
            m('h3', "Name: " + pet.name),
            m('p', "Species: " + pet.species),
          ])
        }),
      ])
    }
  }

})
