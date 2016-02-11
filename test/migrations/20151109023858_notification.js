

exports.up = function(knex, Promise) {

  return knex.schema.createTable('notification', function (table) {
    table.increments('id').primary().notNullable();
    table.string('message').notNullable();
    table.integer('user_id').references('user.id').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) { throw new Error("no revert"); };
