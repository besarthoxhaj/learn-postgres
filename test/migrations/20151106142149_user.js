'use strict';

exports.up = function(knex, Promise) {

  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.integer('money').notNullable();
    table.integer('payout').notNullable();
    table.json('preferences');
  });
};

exports.down = function(knex, Promise) { throw new Error("no revert"); };
