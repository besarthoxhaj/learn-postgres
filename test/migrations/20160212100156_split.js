'use strict';

exports.up = (knex, Promise) => {

  return knex.schema
  .raw(`
    BEGIN;
    CREATE TABLE new_split
      AS (SELECT
        split.id,
        split.bet_part,
        split.sender_id,
        split.recipient_id,
        row_to_json(
          (SELECT s FROM (SELECT first_name, last_name) s)
        )::text AS sender
          FROM split, "user"
          WHERE split.sender_id = "user"."id");
    DROP TABLE split;
    ALTER TABLE new_split RENAME TO split;
    COMMIT;
  `);
};

exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
