var m = require('mithril')

exports.controller = function (options) {}

exports.view = function (ctrl, options) {
  return m('.my-component', [
    m('h2', options.title)
  ])
}
