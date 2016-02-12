## Query

```
SELECT * FROM split WHERE split.bet_part @> '{"price_id":"23772117"}';
```

Where `split.bet_par` is **jsonb**.