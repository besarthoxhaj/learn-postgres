

exports.up = function(knex, Promise) {

  return knex.schema.createTable('split', function (table) {
    table.increments('id').primary().notNullable();
    table.json('bet_part').notNullable();
    table.integer('sender_id').references('user.id').notNullable().onDelete('CASCADE');
    table.integer('recipient_id').references('user.id').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) { throw new Error("no revert"); };
