## Migrations

If a new migrations looks too complicated, is possible to create a *new table* copy in all the data from the *old table* and rename the *new table* the same as the *old table*.

```
CREATE TABLE new_table
AS (SELECT * FROM old_table);
```

It's possible to go even further by copying from multiple tables.

```
CREATE TABLE new_table
  AS (SELECT column_1, column2, ... column_n
    FROM old_table_1, old_table_2, ... old_table_n);
```

```
CREATE TABLE suppliers
  AS (SELECT companies.id, companies.address, categories.cat_type
    FROM companies, categories
    WHERE companies.id = categories.id
    AND companies.id > 1000);
```

```
CREATE TABLE one (id integer, name text, money float);
CREATE TABLE two (id integer, address text, type text);
INSERT INTO one VALUES (1,'Bar',10);
INSERT INTO one VALUES (2,'Foo',11.2);
INSERT INTO one VALUES (3,'Baz',7.5);
INSERT INTO one VALUES (4,'Qux',6.5);
INSERT INTO two VALUES (1,'Street','AA');
INSERT INTO two VALUES (2,'Road','BB');
INSERT INTO two VALUES (3,'Square','AA');
INSERT INTO two VALUES (4,'City','CC');

# create a table named 'three' and populate with data from
# table 'one' and 'two'
CREATE TABLE three
  AS (SELECT one.id, one.name, one.money, two.type
    FROM one, two
    WHERE one.id = two.id);
```

**Migrate data as json**

```
# create a table named 'three' and populate with data from
# table 'one' and 'two'
BEGIN;
CREATE TABLE three
  AS (SELECT
    one.id,
    one.name,
    one.money,
    row_to_json((SELECT s FROM (SELECT type, address) s))::text AS sender
      FROM one, two
      WHERE one.id = two.id);
DROP TABLE one;
ALTER TABLE three RENAME one;
COMMIT;
```

**What happens if both tables have an `address` column?**


```js
// 20160212100156_split.js
'use strict';
exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  CREATE TABLE new_split
    AS (SELECT
      split.id,
      split.bet_part,
      split.sender_id,
      split.recipient_id,
      row_to_json(
        (SELECT s FROM (SELECT first_name, last_name) s)
      )::jsonb AS sender
        FROM split, "user"
        WHERE split.sender_id = "user"."id");
  DROP TABLE split;
  ALTER TABLE new_split RENAME TO split;
  COMMIT;
`);
exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
```


In this way however we lost the metadata about modifiers and constraints.

**Example**

```js
// 20160212113212_split.js
'use strict';
exports.up = (knex, Promise) => knex.schema.table('split', table => {
  table.timestamp('created_at');
  table.text('status');
});
exports.down = (knex, Promise) => {};
```


The schema of our table looks something like this:

```
...insert table schema
```

**Add constraints CHECK**

```js
// 20160212121805_split.js
'use strict';
exports.up = (knex, Promise) => knex.schema.raw(`
  BEGIN;
  ALTER TABLE split ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
  ALTER TABLE split ADD CONSTRAINT "split_status_check"
    CHECK (status = ANY (ARRAY['accepted'::text, 'pending'::text, 'rejected'::text]));
  ALTER TABLE split ALTER COLUMN status SET DEFAULT 'pending';
  COMMIT;
`);
exports.down = (knex, Promise) => knex.schema.raw(`ROLLBACK;`);
```

**Add constraints FOREIGN KEY**

```js
// 20160212124604_split.js
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
```

**Add index**
From [stackoverflow](http://stackoverflow.com/questions/9490014/adding-serial-to-existing-column-in-postgres) and [this blog](https://maksudcse.wordpress.com/2011/03/16/postgresql-add-primary-key-to-an-existing-table/)
```js
// 20160212131135_split.js
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
```

Test it with
```
INSERT INTO split (bet_part, sender_id, recipient_id, sender) VALUES ('{"name":"bet-21678"}', 1, 2, '{"last_name": "Bar-534029", "first_name": "Foo-534029"}');
```