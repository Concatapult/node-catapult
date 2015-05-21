var m = require('mithril')
var MyComponent = require('./components/MyComponent')


window.App = {}

App.mount = function (elem) {
  m.mount(elem, MyComponent)
}
