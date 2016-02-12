'use strict';

exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  ALTER TABLE split ALTER COLUMN created_at SET NOT NULL;
  ALTER TABLE split ALTER COLUMN status SET NOT NULL;
  COMMIT;
`);

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
