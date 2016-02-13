## Query

```
SELECT * FROM split WHERE split.bet_part @> '{"price_id":"23772117"}';
```

Where `split.bet_par` is **jsonb**.

**Create table with serial key**

```
CREATE TABLE "hello" ("id" serial primary key);
```

This will also create a table name `hello_id_seq`.