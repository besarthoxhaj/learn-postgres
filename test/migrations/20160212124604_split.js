'use strict';

exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  ALTER TABLE split
    ADD CONSTRAINT "split_sender_id_foreign" FOREIGN KEY (sender_id)
      REFERENCES "user"(id)
      ON UPDATE CASCADE ON DELETE CASCADE;
  ALTER TABLE split
    ADD CONSTRAINT "split_recipient_id_foreign" FOREIGN KEY (recipient_id)
      REFERENCES "user"(id)
      ON UPDATE CASCADE ON DELETE CASCADE;
  COMMIT;
`);

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
