### Create playground

```
\c postgres;
DROP DATABASE playground;
CREATE DATABASE playground;
\c playground;
CREATE TABLE test (id integer, name text, money float);
INSERT INTO test VALUES (1,'Bar',10);
INSERT INTO test VALUES (2,'Foo',11.2);
INSERT INTO test VALUES (3,'Baz',7.5);
INSERT INTO test VALUES (4,'Qux',6.5);
INSERT INTO test VALUES (5,'Zoo',12.5);
INSERT INTO test VALUES (6,'Tuff',7);
SELECT * FROM test;
```

**Alias**

```
SELECT alias_table.name nameAlias FROM test alias_table;
SELECT a.name nameAlias, a.money moneyAlias FROM test a;
SELECT a.name nameAlias, a.money moneyAlias FROM test a;
SELECT SUM(a.money) total_money FROM test a;
SELECT a.name nameAlias, SUM(a.money) moneyAlias FROM test a;
# ERROR: column "a.name" must appear in the GROUP BY clause or be used in an aggregate function
SELECT a.name nameAlias, SUM(a.money) moneyAlias FROM test a GROUP BY a.name;
```

Why `SELECT a.name nameAlias, SUM(a.money) moneyAlias FROM test a;` fails?

**AS**
...

**What do the quotes means?**
Read more about [**lexical structure**](http://www.postgresql.org/docs/9.4/static/sql-syntax-lexical.html). In general a delimited identifier is always an identifier, never a key word.

