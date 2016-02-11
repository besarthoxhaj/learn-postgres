
/**
 *	Note that 
 *
 *
 */

exports.up = function(knex, Promise) {

  return knex.schema.createTable('address', function (table) {
    table.increments('id').primary().notNullable();
    table.string('line1').notNullable();
    table.string('place').notNullable();
    table.integer('user_id').references('user.id').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) { throw new Error("no revert"); };
