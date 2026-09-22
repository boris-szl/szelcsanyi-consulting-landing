---
title: How I read a slow query before touching it
date: 2026-06-15
lang: en
translationKey: reading-a-slow-query
excerpt: A repeatable way to go from "the database is slow" to a specific, measured fix — without guessing or adding indexes at random.
tags: Postgres, Performance
readingTime: 7 min read
sources:
  - title: EXPLAIN
    url: https://www.postgresql.org/docs/current/sql-explain.html
    publisher: PostgreSQL documentation
    note: Reference for the ANALYZE and BUFFERS options used throughout.
  - title: Using EXPLAIN
    url: https://www.postgresql.org/docs/current/using-explain.html
    publisher: PostgreSQL documentation
    note: How to read a plan, including the estimated-versus-actual row comparison.
  - title: pg_stat_statements
    url: https://www.postgresql.org/docs/current/pgstatstatements.html
    publisher: PostgreSQL documentation
    note: The extension used to find the statements that consume the most total time.
  - title: Statistics Used by the Planner
    url: https://www.postgresql.org/docs/current/planner-stats.html
    publisher: PostgreSQL documentation
    note: Why stale statistics produce bad row estimates and poor join orders.
  - title: Multicolumn Indexes
    url: https://www.postgresql.org/docs/current/indexes-multicolumn.html
    publisher: PostgreSQL documentation
    note: Column-order rules behind the composite index in step four.
  - title: auto_explain
    url: https://www.postgresql.org/docs/current/auto-explain.html
    publisher: PostgreSQL documentation
    note: Logs plans for slow statements automatically when reproducing by hand is impractical.
---

"The database is slow" is not a bug report — it is a feeling. My job is to turn it into a number, then turn that number into a plan. Here is the loop I run, more or less unchanged, on every performance engagement.

## 1. Reproduce it with a real query

Guessing from a dashboard is how you end up optimising the wrong thing. I start by capturing the exact statement and parameters that are hurting, ideally from `pg_stat_statements`, sorted by total time rather than mean time. The query that is 8ms but runs a million times a day matters more than the 2-second report nobody looks at.

## 2. Ask the planner, do not assume

`EXPLAIN (ANALYZE, BUFFERS)` is the whole game. It tells you what the planner *actually did*, not what you hoped it would:

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE tenant_id = $1 AND status = 'open'
ORDER BY created_at DESC
LIMIT 50;
```

Two things I read first:

- **Estimated vs actual rows.** A large gap means the planner has bad statistics and is making bad choices downstream.
- **Buffers.** Heap reads that dwarf the rows returned mean I am fetching far more data than the answer needs.

## 3. Name the actual problem

Most slow queries I see are one of a short list:

1. A missing or wrong index — a sequential scan where a filter should have narrowed things.
2. A poor join order caused by stale statistics.
3. Fetching wide rows when only a few columns are used.
4. Doing in the database what should be a cache.

> Naming the category is 80% of the fix. Only once I can say *which* of these it is do I let myself write any SQL.

## 4. Change one thing, measure again

Then — and only then — I make a single change: add the composite index, rewrite the join, add a covering column. I re-run the same `EXPLAIN ANALYZE` and compare. One variable at a time, every time, so I can attribute the improvement honestly.

The discipline is not in knowing clever tricks. It is in refusing to move to step four until steps one through three are boringly, provably done.
