require('../ext/server')
process.env.NODE_ENV = 'test'

// The following allows you to require files independent of
// the location of your test file.
// Example:
//  var User = require(__server + '/models/user.js')
//
global.__server = __dirname + '/../server'
global.__client = __dirname + '/../client'


// Mocha "helpers" to support coroutines tests
global.beforeEach_ = function (f) { beforeEach( Promise.coroutine(f) ) }
global.it_ = function (description, f) { it( description, Promise.coroutine(f) ) }
global.xit_ = function (description, f) { xit( description, f ) }
global.it_.only = function (description, f) { it.only( description, Promise.coroutine(f) ) }

//
// Assertions
//
var chai = require('chai')
// Option 1: Make the `expect` function available in every test file
global.expect = chai.expect
// Option 2: Make everything should-able
// chai.should()


//
// Helper Functions
//
// This is the object you can attach any helper functions used across
// several test files.
global.TestHelper = {}

//
// Mock apps for API testing
//
var express = require('express')

TestHelper.createApp = function (loader) {
  var app = express()
  app.use(require('body-parser').json())

  app.testReady = function () {
    // Log all errors
    app.use(function (err, req, res, next) {
      console.error("==Error==")
      console.error("   " + err.stack)
      next(err)
    })
  }
  return app
}
