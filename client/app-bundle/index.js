var m = require('mithril')
var MyComponent = require('./components/MyComponent')


window.App = {}

App.controller = function () {}

App.view = function (ctrl) {
  return [
    m('h1', 'Node Catapult'),
    m.component(MyComponent, { title: 'Welcome to my app!' })
  ]
}

m.mount(document.getElementById('app'), App)
