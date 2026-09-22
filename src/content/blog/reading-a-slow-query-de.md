---
title: Wie ich eine langsame Query lese, bevor ich sie anfasse
date: 2026-06-15
lang: de
translationKey: reading-a-slow-query
excerpt: Ein wiederholbarer Weg von „die Datenbank ist langsam“ zu einer konkreten, gemessenen Lösung — ohne Raten und ohne wahllos Indizes anzulegen.
seoTitle: "Postgres: langsame Query analysieren statt raten"
seoDescription: >-
  Von „die Datenbank ist langsam“ zur gemessenen Lösung: pg_stat_statements, EXPLAIN ANALYZE mit BUFFERS lesen und jeweils nur eine Sache ändern. Ein Vorgehen.
tags: Postgres, Performance
readingTime: 7 Min. Lesezeit
sources:
  - title: EXPLAIN
    url: https://www.postgresql.org/docs/current/sql-explain.html
    publisher: PostgreSQL-Dokumentation
    note: Referenz zu den Optionen ANALYZE und BUFFERS, die hier durchgehend verwendet werden.
  - title: Using EXPLAIN
    url: https://www.postgresql.org/docs/current/using-explain.html
    publisher: PostgreSQL-Dokumentation
    note: Wie ein Ausführungsplan zu lesen ist, einschließlich des Vergleichs geschätzter und tatsächlicher Zeilen.
  - title: pg_stat_statements
    url: https://www.postgresql.org/docs/current/pgstatstatements.html
    publisher: PostgreSQL-Dokumentation
    note: Die Erweiterung, mit der sich die Statements finden lassen, die in Summe die meiste Zeit verbrauchen.
  - title: Statistics Used by the Planner
    url: https://www.postgresql.org/docs/current/planner-stats.html
    publisher: PostgreSQL-Dokumentation
    note: Warum veraltete Statistiken zu falschen Zeilenschätzungen und schlechten Join-Reihenfolgen führen.
  - title: Multicolumn Indexes
    url: https://www.postgresql.org/docs/current/indexes-multicolumn.html
    publisher: PostgreSQL-Dokumentation
    note: Regeln zur Spaltenreihenfolge, die hinter dem zusammengesetzten Index in Schritt vier stehen.
  - title: auto_explain
    url: https://www.postgresql.org/docs/current/auto-explain.html
    publisher: PostgreSQL-Dokumentation
    note: Protokolliert Pläne langsamer Statements automatisch, wenn das Nachstellen von Hand unpraktisch ist.
---

„Die Datenbank ist langsam“ ist kein Fehlerbericht — das ist ein Gefühl. Meine Aufgabe ist es, daraus eine Zahl zu machen und aus dieser Zahl einen Plan. Hier ist die Schleife, die ich in jedem Performance-Mandat durchlaufe, mehr oder weniger unverändert.

## 1. Mit einer echten Query nachstellen

Vom Dashboard aus zu raten ist der sichere Weg, das Falsche zu optimieren. Ich fange damit an, genau das Statement und die Parameter zu erfassen, die wehtun — am besten aus `pg_stat_statements`, sortiert nach Gesamtzeit statt nach Mittelwert. Die Abfrage, die 8 Millisekunden braucht und eine Million Mal am Tag läuft, ist wichtiger als der Zwei-Sekunden-Bericht, den niemand ansieht.

## 2. Den Planer fragen, nicht vermuten

`EXPLAIN (ANALYZE, BUFFERS)` ist das ganze Spiel. Es zeigt, was der Planer *tatsächlich getan hat*, nicht, was man sich erhofft hatte:

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE tenant_id = $1 AND status = 'open'
ORDER BY created_at DESC
LIMIT 50;
```

Zwei Dinge lese ich zuerst:

- **Geschätzte gegenüber tatsächlichen Zeilen.** Eine große Abweichung bedeutet, dass der Planer mit schlechten Statistiken arbeitet und in der Folge schlechte Entscheidungen trifft.
- **Buffers.** Wenn die gelesenen Heap-Blöcke die zurückgegebenen Zeilen um ein Vielfaches übersteigen, hole ich weit mehr Daten, als die Antwort braucht.

## 3. Das eigentliche Problem benennen

Die meisten langsamen Abfragen, die mir begegnen, gehören zu einer kurzen Liste:

1. Ein fehlender oder falscher Index — ein sequenzieller Scan dort, wo ein Filter hätte eingrenzen sollen.
2. Eine schlechte Join-Reihenfolge aufgrund veralteter Statistiken.
3. Breite Zeilen holen, obwohl nur wenige Spalten gebraucht werden.
4. In der Datenbank tun, was ein Cache erledigen sollte.

> Die Kategorie zu benennen ist 80 Prozent der Lösung. Erst wenn ich sagen kann, *welche* davon es ist, erlaube ich mir, SQL zu schreiben.

## 4. Eine Sache ändern, erneut messen

Dann — und erst dann — nehme ich genau eine Änderung vor: den zusammengesetzten Index anlegen, den Join umschreiben, eine Spalte in den Index aufnehmen. Ich führe dasselbe `EXPLAIN ANALYZE` erneut aus und vergleiche. Eine Variable nach der anderen, jedes Mal, damit ich die Verbesserung ehrlich zuordnen kann.

Die Disziplin liegt nicht darin, clevere Kniffe zu kennen. Sie liegt darin, sich Schritt vier zu verweigern, bis die Schritte eins bis drei langweilig und nachweisbar erledigt sind.
