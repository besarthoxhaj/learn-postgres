'use strict';

exports.up = (knex, Promise) => knex.schema.table('split', table => {
  table.timestamp('created_at');
  table.text('status');
});

exports.down = (knex, Promise) => {};
