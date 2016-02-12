'use strict';

exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  ALTER TABLE split ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
  ALTER TABLE split ADD CONSTRAINT "split_status_check"
    CHECK (status = ANY (ARRAY['accepted'::text, 'pending'::text, 'rejected'::text]));
  COMMIT;
`);

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
