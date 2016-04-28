## Joins

Offical [documentation](http://www.postgresql.org/docs/9.4/static/tutorial-join.html)

```
\c postgres;
DROP DATABASE playground;
CREATE DATABASE playground;
\c playground;
CREATE TABLE one (id integer, name text, money float, two_id integer);
CREATE TABLE two (id integer, address text, type text);
INSERT INTO one VALUES (1,'Bar',10,2);
INSERT INTO one VALUES (2,'Foo',11.2,2);
INSERT INTO one VALUES (3,'Baz',7.5,2);
INSERT INTO one VALUES (4,'Qux',6.5,1);
INSERT INTO two VALUES (1,'Street','AA');
INSERT INTO two VALUES (2,'Road','BB');
INSERT INTO two VALUES (3,'Square','AA');
INSERT INTO two VALUES (4,'City','CC');
```

### Join and add as jsonb



```
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 ON boolean_expression
T1 { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2 USING ( join column list )
T1 NATURAL { [INNER] | { LEFT | RIGHT | FULL } [OUTER] } JOIN T2
```