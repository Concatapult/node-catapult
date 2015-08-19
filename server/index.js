var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app-bundle/index.js'))

// Non-js static files
app.use(express.static('client/public'))

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
