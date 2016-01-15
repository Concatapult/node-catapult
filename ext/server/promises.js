global.Promise = require('bluebird')
Promise.co = function (f) {
  return Promise.coroutine(f)()
}
