

var Chat = module.exports

var store = []

Chat.all = function () {
  return Promise.resolve(store)
  // Later, replace with db call:
  // return knex('chats').select('*')
}

Chat.create = function (attrs) {
  var newChat = validateCreate(attrs)
  store.push(newChat)
  return Promise.resolve(newChat)
}


function validateCreate (attrs) {
  // ...
  return attrs
}
