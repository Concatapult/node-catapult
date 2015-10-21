
exports.up = function(knex, Promise) {

  return knex.schema.createTable('pets', function (table) {
    table.increments();
    table.string('name');
    table.string('species');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  
};
