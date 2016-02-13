'use strict';

exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  ALTER TABLE split ALTER COLUMN bet_part SET NOT NULL;
  ALTER TABLE split ALTER COLUMN sender_id SET NOT NULL;
  ALTER TABLE split ALTER COLUMN sender SET NOT NULL;
  ALTER TABLE split ALTER COLUMN recipient_id SET NOT NULL;
  COMMIT;
`);

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
