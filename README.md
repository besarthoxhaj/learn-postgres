# Learn postgres

## Help tools

http://sqlfiddle.com/

Schema to get start with:

```
CREATE TABLE test (id integer, name text, money float);
INSERT INTO test VALUES (1,'Bar',10);
INSERT INTO test VALUES (2,'Foo',11.2);
INSERT INTO test VALUES (3,'Baz',7.5);
INSERT INTO test VALUES (4,'Qux',6.5);
INSERT INTO test VALUES (5,'Zoo',12.5);
INSERT INTO test VALUES (6,'Tuff',7);
```

Testing out using [knex](http://knexjs.org/) with postgres.

### CLI

Knex offers a Command Line Interface (CLI).

```
$ knex --help
```

To have a better insight of the internal implementation look at: `node_modules/.bin/knex`. The CLI uses the knex API underneath.

### Config

The main config file is `knexfile.js`. Is possible to define many configuration object.

```js
module.exports = {
  development: { /* ... */ },
  production: { /* ... */ },
  staging: { /* ... */ },
  test: { /* ... */ },
};
```

Is possible to switch between them by setting `NODE_ENV=test`.


### Migrations


### Seed files

Seed files allow you to populate your database with test or seed data independent of your migration files.

### Debug

Is it possible to debug a specific query by adding:

```js
knex('users')
.select('first_name')
.debug(true)
.asCallback(function (err, row) { /* ... */);
```

This will output as stdout:

```
{
  method: 'select',
  options: {},
  bindings: [],
  sql: 'select "first_name" from "users"'
}
```

Another strategy is to add in the `knexfile.js`

```js
module.exports = {
  development: {
    // ...
    debug: process.env.PG_DEBUG || false,
    // ...
  }
}
```

### Joins

```
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 ON boolean_expression
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 USING ( join column list )
T1 NATURAL { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2
```

Some examples:

```
SELECT * FROM "user" INNER JOIN "address" ON "user"."id" = "userId";
```
