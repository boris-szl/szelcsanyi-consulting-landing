---
title: Bewusst langweilige Software ausliefern
date: 2026-07-28
lang: de
translationKey: ship-boring-software
excerpt: Die verlässlichsten Systeme, die ich gebaut habe, waren auch die am wenigsten cleveren. Warum ich zuerst zum Langweiligen greife — und wann ich meine eigene Regel breche.
seoTitle: Bewusst langweilige Software ausliefern
seoDescription: >-
  Warum bewährte Technik verlässlicher altert als neue, wie ein Neuheitsbudget funktioniert und unter welchen drei Bedingungen sich die riskante Wahl doch lohnt.
tags: Architecture, Reliability
readingTime: 6 Min. Lesezeit
sources:
  - title: Choose Boring Technology
    url: https://mcfunley.com/choose-boring-technology
    publisher: Dan McKinley
    note: Der Ursprung der „Innovation Tokens“, die dieser Beitrag als Neuheitsbudget bezeichnet.
  - title: Yagni
    url: https://martinfowler.com/bliki/Yagni.html
    publisher: Martin Fowler
    note: Das verwandte Argument dagegen, für vermutete künftige Anforderungen zu bauen.
  - title: DORA — Fähigkeiten und die vier Schlüsselkennzahlen
    url: https://dora.dev/guides/dora-metrics-four-keys/
    publisher: DORA (Google Cloud)
    note: Belege dafür, dass Auslieferungsgeschwindigkeit und Stabilität sich gemeinsam verbessern, statt gegeneinander zu stehen.
---

Früh in meiner Laufbahn habe ich Neuheit mit Qualität verwechselt. Ein neuer Datenspeicher, eine exotische Queue, ein Framework, das seit drei Wochen auf Hacker News steht — jedes davon fühlte sich nach Fortschritt an. Die meisten wurden zu dem, weswegen ich um drei Uhr nachts angerufen wurde.

Heute optimiere ich auf eine andere Eigenschaft: **Wie schnell versteht die nächste Entwicklerin das hier und kann es gefahrlos ändern?** Diese Frage führt in aller Regel zu langweiliger, gut verstandener Technik — und sie war bisher der beste Vorhersagewert dafür, ob ein System gut altert.

## Langweilig ist ein Vorzug, kein Kompromiss

Langweilige Technik hat eine große Fläche an Vorerfahrung. Wenn Postgres etwas Überraschendes tut, sind zehntausend Leute vorher darüber gestolpert und haben es aufgeschrieben. Wenn Ihre selbstgebaute Konsensschicht etwas Überraschendes tut, sind Sie die Dokumentation.

Das zählt genau dann am meisten, wenn es brennt:

- Die Fehlerbilder sind bekannt und auffindbar.
- Einstellungen sind leichter, weil die Fähigkeiten bereits existieren.
- Das Umfeld — Backups, Migrationen, Observability — ist ausgereift.

Nichts davon ist glamourös. Alles davon summiert sich.

## Wann ich meine Regel breche

Standardmäßig langweilig heißt nicht immer langweilig. Ich gebe Neuheitsbudget aus — was Dan McKinley [Innovation Tokens](https://mcfunley.com/choose-boring-technology) nannte, von denen man etwa drei hat —, wenn drei Dinge zusammenkommen:

1. Das Problem gehört wirklich zum Kern des Geschäfts und ist nicht nebensächlich.
2. Die langweilige Option hat eine konkrete, gemessene Obergrenze, an die ich bereits gestoßen bin.
3. Ich kann das Neue hinter einer Schnittstelle einkapseln, die ich in einer Woche wieder herausreißen könnte.

> Eine gute Architektur macht die umkehrbaren Entscheidungen billig und die unumkehrbaren selten.

Wenn ich die Linie nicht ziehen kann, an der das riskante Bauteil endet, bin ich noch nicht so weit, es hinzuzufügen.

## Der Test, den ich tatsächlich anwende

Bevor ich etwas in einen Stack aufnehme, frage ich: *Wenn das zum denkbar schlechtesten Zeitpunkt kaputtgeht — weiß ich, wie ich es repariere, und kann ich diese Reparatur jemandem erklären, der es noch nie gesehen hat?*

Lautet die Antwort nein, ist die interessante Wahl meistens die falsche. Liefern Sie die langweilige Variante aus, messen Sie sie — und lassen Sie die Daten entscheiden, wann es Zeit für etwas Schärferes ist, nicht das Changelog.
