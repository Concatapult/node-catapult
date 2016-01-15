var m = require('mithril')

exports.controller = function (options) {
  var ctrl = this

  ctrl.content = ''

  ctrl.submit = function (e) {
    e.preventDefault()

    m.request({
      method: 'POST',
      url: '/chats',
      data: { content: ctrl.content }
    })
    .then(function(newChat) {
      ctrl.chats.push(newChat)
    })
  }

  m.request({ method: 'GET', url: '/chats' })
    .then(function(chats){
      ctrl.chats = chats
    })
}

exports.view = function (ctrl, options) {
  return m('.chats-component', [
    m('h2', 'All Chats'),

    m('ul',
      ctrl.chats.map(function (c) {
        return m('li', c.content)
      })
    ),

    m('form', { onsubmit: ctrl.submit }, [
      m('input[type=text]', {
        oninput: e => ctrl.content = e.currentTarget.value,
        value: ctrl.content
      }),

      m('button[type=submit]', "Submit Chat")
    ]),

  ])
}
