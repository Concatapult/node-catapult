var Promise = require('bluebird')

// Read configuration file
var config = require('../../knexfile.js')

// Configure knex with the correct environment configuration
var env = process.env.NODE_ENV || 'development'
var db = require('knex')(config[env])

// Export the db object, which will be able to make database connections
module.exports = db

// Function for your testing suite
db.deleteEverything = function () {
  if (env !== 'test') return Promise.reject();

  // TODO: Delete data from all tables (useful for testing)
  return db('pets').delete()
}
