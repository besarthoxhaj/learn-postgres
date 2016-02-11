

exports.up = function(knex, Promise) {

  return knex.schema.createTable('bet', function (table) {
    table.increments('id').primary().notNullable();
    table.json('bet_part').notNullable();
    table.bool('settled').notNullable().defaultTo(false);
    table.float('payout').notNullable().defaultTo(0);
    table.date('placed_on').notNullable().defaultTo(knex.raw('clock_timestamp()'));
    table.integer('user_id').references('user.id').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) { throw new Error("no revert"); };
