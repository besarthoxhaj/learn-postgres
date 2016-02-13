'use strict';

exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
    CREATE SEQUENCE split_id_seq;
    ALTER TABLE split ALTER COLUMN id SET DEFAULT nextval('split_id_seq');
    ALTER TABLE split ALTER COLUMN id SET NOT NULL;
    ALTER SEQUENCE split_id_seq OWNED BY split.id;
    SELECT setval('split_id_seq', (SELECT MAX(id) FROM split));
  COMMIT;
`);

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
