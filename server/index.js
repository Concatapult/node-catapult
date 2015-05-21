var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

//provide a browserified file at a path
var shared = ['mithril']
app.get('/js/vendor-bundle.js', browserify(shared))
app.get('/js/app-bundle.js', browserify('./client/app-bundle/index.js', { external: shared }))

// Non-js static files
app.use(express.static('client/public'))

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
