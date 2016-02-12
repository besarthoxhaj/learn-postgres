'use strict';

exports.up = (knex, Promise) => {};
exports.down = (knex, Promise) => {};

// exports.up = (knex, Promise) => knex.schema.raw(`
//   BEGIN;
//   ALTER TABLE split ALTER COLUMN id SERIAL;
//     UPDATE split SET id = DEFAULT;
//     ALTER TABLE split ADD PRIMARY KEY (id);
//   COMMIT;
// `);

// exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
