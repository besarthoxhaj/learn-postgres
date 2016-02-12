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
CREATE TABLE three
  AS (SELECT
    one.id,
    one.name,
    one.money,
    row_to_json((SELECT s FROM (SELECT type, address) s))::text AS sender
      FROM one, two
      WHERE one.id = two.id);
```

