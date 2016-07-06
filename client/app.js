var m = require('mithril')
var MyComponent = require('./components/MyComponent')

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.prefix('')
m.route(document.getElementById('app'), '/', {

  '/': {
    view: function (ctrl) {
      return m('.app', [
        m('h1', 'Node Catapult'),
        m(MyComponent, { title: 'Welcome to my app!' })
      ])
    }
  }

})
