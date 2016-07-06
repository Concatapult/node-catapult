var m = require('mithril')

exports.view = function (vnode) {
  return m('.my-component', [
    m('h2', vnode.attrs.title)
  ])
}
