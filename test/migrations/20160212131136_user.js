'use strict';

exports.up = (knex,Promise) => {
  return knex.schema.table('user', table => {
    table.jsonb('tool_tips').notNullable().defaultTo({
      show_start_deck:true,
      show_split_deck:true,
      show_split_overlay:true
    });
  });
};

exports.down = (knex,Promise) => {
  return knex.schema.table('user', table => {
    table.dropColumn('tool_tips');
  });
};
