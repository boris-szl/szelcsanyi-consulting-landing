---
title: Cyber-Risiko in Euro beziffern, nicht in Ampelfarben
date: 2026-09-14
lang: de
translationKey: pricing-cyber-risk-in-euros
excerpt: Dieses Jahr habe ich Nisura gebaut — eine europäische Engine zur Quantifizierung von Cyber-Risiken. Hier sind die Modellierungsentscheidungen, auf die es ankam, einschließlich jener, über die ich wochenlang mit mir selbst gestritten habe.
seoTitle: "Cyber-Risiko in Euro statt in Ampelfarben"
seoDescription: >-
  Cyber-Risiko-Quantifizierung für Europa: warum CVSS die falsche Reihenfolge erzeugt und US-Schadensmodelle sich nicht in Euro umrechnen lassen.
tags: Security, Cyber Risk, NIS2, Product
readingTime: 8 Min. Lesezeit
keyPoints:
  - >-
      Schwachstellen nach CVSS zu sortieren ordnet sie nach theoretischem Schadensmaximum; die Sortierung nach Ausnutzungsnachweis (CISA KEV, EPSS, SSVC) dreht einen großen Teil dieser Reihenfolge um.
  - >-
      US-Schadensmodelle aus Versicherungsdaten lassen sich nicht in Euro umrechnen: Sie sind durch Deckungssummen begrenzt und beruhen auf amerikanischen Lohnkosten und Margen.
  - >-
      Maßnahmen wie MFA senken die Eintrittswahrscheinlichkeit, Resilienz wie geprüfte Backups senkt die Schadenshöhe. Beides in eine Kennzahl zu pressen zerstört genau diese Unterscheidung.
  - >-
      Das Ergebnis ist eine Verlustüberschreitungskurve statt einer einzelnen Zahl, denn eine Punktschätzung erzeugt genau die Scheingenauigkeit, die man Heatmaps vorwirft.
  - >-
      NIS2 Artikel 21 verlangt fortlaufendes Risikomanagement, und Artikel 34 deckelt Bußgelder für wesentliche Einrichtungen bei mindestens 10 Millionen Euro oder 2 Prozent des weltweiten Jahresumsatzes.
sources:
  - title: Known Exploited Vulnerabilities (KEV) Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    publisher: CISA
    note: Die maßgebliche Liste von Schwachstellen mit bestätigter Ausnutzung in freier Wildbahn — hier das erste Sortierkriterium, noch vor dem Schweregrad.
  - title: EPSS — Exploit Prediction Scoring System
    url: https://www.first.org/epss/
    publisher: FIRST
    note: Tägliche Wahrscheinlichkeitsschätzungen, dass eine Schwachstelle in den nächsten 30 Tagen ausgenutzt wird.
  - title: CVSS — Common Vulnerability Scoring System
    url: https://www.first.org/cvss/
    publisher: FIRST
    note: Der Schweregradstandard, der laut diesem Beitrag notwendig, aber für die Frage nach der Reihenfolge nicht hinreichend ist.
  - title: Stakeholder-Specific Vulnerability Categorization (SSVC)
    url: https://www.cisa.gov/stakeholder-specific-vulnerability-categorization-ssvc
    publisher: CISA
    note: Der Entscheidungsbaum hinter den Kategorien Track, Track*, Attend und Act.
  - title: "Richtlinie (EU) 2022/2555 (NIS2) — Artikel 21: Risikomanagementmaßnahmen"
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj
    publisher: EUR-Lex
    note: Artikel 21 Absatz 2 Buchstabe g behandelt Cyberhygiene und Schulungen; Artikel 34 setzt die Obergrenze für Bußgelder gegen wesentliche Einrichtungen auf mindestens 10 Millionen Euro oder 2 Prozent des weltweiten Jahresumsatzes, je nachdem, welcher Betrag höher ist.
  - title: Verordnung (EU) 2022/2554 (DORA)
    url: https://eur-lex.europa.eu/eli/reg/2022/2554/oj
    publisher: EUR-Lex
    note: Das eigenständige Regime zur digitalen operationalen Resilienz, das für Finanzunternehmen gilt.
  - title: Verordnung (EU) 2016/679 (DSGVO)
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
    note: Gesetzliche Bußgeldobergrenzen, die auf anderer Grundlage berechnet werden als jene der NIS2.
  - title: European Vulnerability Database (EUVD)
    url: https://euvd.enisa.europa.eu/
    publisher: ENISA
    note: Die europäische Schwachstellenquelle, die neben den amerikanischen Feeds verwendet wird.
  - title: Arbeitskostenstatistik
    url: https://ec.europa.eu/eurostat/web/labour-market/information-data/labour-costs
    publisher: Eurostat
    note: Stundenbezogene Arbeitskosten als Grundlage des Ausfallkostenmodells.
  - title: NACE — statistische Systematik der Wirtschaftszweige
    url: https://ec.europa.eu/eurostat/web/nace
    publisher: Eurostat
    note: Die Branchensystematik, die NIS2 selbst zur Abgrenzung der betroffenen Einrichtungen verwendet.
  - title: Aktuelle Daten — Margen nach Branchen (Europa)
    url: https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html
    publisher: Aswath Damodaran, NYU Stern
    note: Branchenbezogene operative Margen für die Modellierung von Betriebsunterbrechungen.
  - title: Factor Analysis of Information Risk (FAIR)
    url: https://www.fairinstitute.org/
    publisher: FAIR Institute
    note: Das quantitative Risikoframework hinter der Zerlegung des Schadens in Eintrittshäufigkeit und Schadenshöhe.
---

Jedem Vorstand, vor dem ich gesessen habe, wurde dasselbe Artefakt gezeigt: ein Raster aus roten, gelben und grünen Kästchen. Jemand geht es durch, alle nicken, die Sitzung geht weiter. Dann stellt die Finanzvorständin die einzige Frage, auf die es wirklich ankommt — *was kostet uns das gerade, und wie viel würde es sparen, das zu beheben?* — und im Raum wird es still.

Diese Stille ist der Grund, warum es [Nisura](https://nisura.eu) gibt. Es ist eine Engine zur Quantifizierung von Cyber-Risiken für den europäischen Markt: Sie erfasst die externe Angriffsfläche und löst sie in einen Eurobetrag auf, den ein Vorstand gegen die Kosten von Maßnahmen abwägen kann. In diesem Beitrag geht es um die Modellierung dahinter — einschließlich der Entscheidung, die ich zuerst falsch getroffen habe.

## Schweregrad ist nicht dasselbe wie Gefahr

Der erste Reflex ist, nach CVSS zu sortieren. Das ist der Wert, den alle kennen, er steht in jedem Advisory und liegt direkt im Feed bereit. Für die Entscheidung, was man am Montag behebt, ist er nahezu unbrauchbar.

CVSS beantwortet die Frage, *wie schlimm es wäre, wenn jemand das ausnutzt*. Es sagt nichts darüber, ob das gerade tatsächlich jemand tut. Die Folge ist eine Warteschlange, sortiert nach theoretischem Schadensmaximum, in der eine 9,8 steht, die nie jemand zu einer Waffe gemacht hat — über einer 7,5, die drei Ransomware-Gruppen heute aktiv einsetzen.

Deshalb sortiert die Engine stattdessen nach Ausnutzungsnachweis: nach dem Katalog bekannter ausgenutzter Schwachstellen der CISA, den EPSS-Wahrscheinlichkeiten von FIRST und den SSVC-Entscheidungspunkten der CISA-ADP (Act / Attend / Track). Kombiniert man das, kehrt sich die Reihenfolge auf eine Weise um, die zunächst falsch aussieht — bis man eine Weile damit gearbeitet hat.

## Das amerikanische Modell lässt sich nicht umrechnen

Das ist die Entscheidung, an der ich am längsten gesessen habe, und mein erster Instinkt war falsch.

Die ausgereiften Schadensmodelle in diesem Feld beruhen auf US-amerikanischen Versicherungsdaten. Das sind wirklich gute Daten — jahrzehntelang gesammelt, versicherungsmathematisch sauber, weit reichhaltiger als alles Vergleichbare in Europa. Mein ursprünglicher Plan war, sie zu verwenden und das Ergebnis in Euro umzurechnen.

Das funktioniert nicht, und der Grund ist nicht der Wechselkurs.

Ein Modell aus Schadensfällen erbt die Form der Policen, die dahinterstehen. Es ist durch das begrenzt, was Versicherer zu zahlen bereit waren — es deckelt Ihr Risiko also stillschweigend bei der Deckungssumme und blendet genau die Teile aus, die am meisten wehtun: Selbstbehalte, abwandernde Kunden, Reputationsschäden, verlorenes geistiges Eigentum, die achtzehn Monate verschobene Produktentwicklung nach einem Vorfall. Sie messen nicht Ihre Exponierung. Sie messen die Bereitschaft eines Dritten, einen Ausschnitt davon zu zeichnen.

Hinzu kommt, dass die Eingangsgrößen für europäische Verhältnisse falsch sind. Ausfallkosten sind eine Funktion der Arbeitskosten, und Arbeitskosten in Österreich sind nicht Arbeitskosten in Texas. Betriebsunterbrechung hängt von der operativen Marge je Branche ab, und europäische Margen unterscheiden sich strukturell. Regulatorische Exponierung ist hier kein Rundungsfehler — NIS2 und DSGVO haben gesetzliche Obergrenzen, die unterschiedlich berechnet werden, und DORA betrifft einen ganz anderen Kreis von Unternehmen.

Die Engine ist deshalb andersherum gebaut: auf Arbeitskostenindizes von Eurostat, Margendaten von Damodaran für Europa, der NACE-Branchensystematik, die NIS2 selbst verwendet, und der EUVD der ENISA als vollwertiger Schwachstellenquelle neben den amerikanischen Feeds. Die Bedrohungsdaten sind global, weil Angreifer es auch sind. Das Schadensmodell ist europäisch, weil die Schäden es sind.

Das ist auch der Teil, der sich am schwersten kopieren lässt. An dieselben öffentlichen Feeds kann sich jeder anschließen — die sind Grundausstattung. Das europäische Kostenmodell zu bauen ist die langsame, unspektakuläre Arbeit, die das Ergebnis tatsächlich unterscheidbar macht.

## Eintrittswahrscheinlichkeit und Schadenshöhe sind zwei Hebel

Die zweite Modellierungsentscheidung war, zwei Dinge zu trennen, die die meisten Werkzeuge vermischen.

Mehrfaktor-Authentifizierung für externe Zugänge verändert die *Wahrscheinlichkeit* eines Einbruchs. Geprüfte Offline-Backups tun das nicht — sie verändern, was er Sie *kostet*, wenn er trotzdem passiert. Das sind mathematisch verschiedene Operationen, und sie in einen einzigen „Sicherheitsscore“ zusammenzufalten zerstört genau die Information, die eine Entscheiderin braucht.

Maßnahmen und Resilienz werden deshalb als getrennte Ebenen modelliert:

- **Maßnahmen** — MFA, EDR, schnelles Patchen, Segmentierung, kein offenes RDP — senken die modellierte Eintrittswahrscheinlichkeit.
- **Resilienz** — unveränderliche Backups, ein geprüfter Incident-Response-Retainer, ein geübter Notfallplan — senken den verbleibenden Schaden.

Der praktische Gewinn: Eine CISO sieht, bevor sie einen Euro ausgibt, welcher Hebel ihre Zahl weiter bewegt. Manchmal ist die Antwort eine Maßnahme für 40.000 Euro. Oft ist es eine geübte Rücksicherung, die ein Wochenende kostet. Ein einziger gemischter Score kann Ihnen das nie sagen.

Der erwartete Jahresschaden ergibt sich dann auf die naheliegende Weise — Eintrittswahrscheinlichkeit mal Schadenshöhe, summiert über die modellierten Szenarien — und wird als Verlustüberschreitungskurve dargestellt statt als eine Zahl, weil die interessanten Entscheidungen im Randbereich liegen. Der erwartete Jahresschaden sagt Ihnen, was Sie budgetieren sollten. Der wahrscheinliche Maximalschaden sagt Ihnen, was das Unternehmen beenden könnte. Das gehören zwei getrennte Zeilen.

## Was NIS2 Artikel 21 tatsächlich verlangt

Um NIS2 gibt es viel Lärm, das meiste davon verkauft Angst vor der 10-Millionen-Obergrenze und der persönlichen Haftung von Führungskräften. Beides ist real. Keines davon ist der nützliche Teil.

Der nützliche Teil ist, dass Artikel 21 *fortlaufendes* Risikomanagement und die Bewertung der Lieferkette verlangt und Absatz 2 Buchstabe g Cyberhygiene und Schulungen abdeckt. „Fortlaufend“ ist das tragende Wort. Ein jährlicher Penetrationstest ist in dem Moment veraltet, in dem er gedruckt wird, und ein Lieferantenfragebogen ist eine Selbstauskunft, die niemand prüft. Beides übersteht keine Prüferin, die wissen will, wie Ihre Lage im März aussah.

Fortlaufende externe Überwachung erzeugt etwas, das eine Momentaufnahme strukturell nicht liefern kann: einen mit Zeitstempeln versehenen, nachprüfbaren Verlauf Ihrer Exponierung — wann sie bestand und was Sie dagegen unternommen haben. Das ist das Compliance-Artefakt: kein Zertifikat, sondern eine Historie.

Dieselbe Logik hat auch das menschliche Risiko ins Modell gebracht. Autorisierte Phishing-Simulationen gegen die eigene Belegschaft liefern eine echte Klickrate, die als Faktor auf den Angriffsweg über Zugangsdaten einfließt, statt als separater Bericht zu enden, den niemand liest. Nur aggregiert, nie werden Zugangsdaten erfasst, abgesichert durch eine unterschriebene Beauftragung und in Österreich und Deutschland durch eine Betriebsratszustimmung. Diese letzte Auflage ist hier kein Nice-to-have — macht man das falsch, hat man ein arbeitsrechtliches Problem geschaffen, während man ein Sicherheitsproblem lösen wollte.

## Der Teil, der mich ehrlich hält

Der naheliegende Fehlermodus dieser ganzen Kategorie ist Scheingenauigkeit. Eine Zahl wie *1.250.400 €* liest sich, als hätte sie jemand nachgezählt. Niemand hat sie nachgezählt. Sie ist das Ergebnis eines probabilistischen Modells mit echter Unsicherheit in jeder Eingangsgröße, und sie als harte Zahl zu präsentieren lädt genau zu der Selbstsicherheit ein, die man Heatmaps vorwirft.

Diese Spannung habe ich nicht vollständig gelöst. Was bisher hilft: die Kurve zeigen statt der Punktschätzung, die Annahmen einsehbar halten, für jede Kostenbasis die Quelle angeben und deutlich sagen, dass dies eine Entscheidungshilfe ist und weder eine Prüfung noch ein versicherungstechnisches Gutachten. Die ehrliche Einordnung lautet: Die Zahl ist nicht *richtig* — sie ist *begründbar*, und sie ist in einer Richtung falsch, die man einsehen und bestreiten kann. Das ist eine echte Verbesserung gegenüber Gelb, aber es ist nicht dasselbe wie Wahrheit.

Die andere Auflage, die ich mir früh gesetzt habe: Die kostenlose Erstanalyse schickt kein einziges Paket an Ihre Infrastruktur. Nur passives OSINT, keine Anmeldung, keine Agenten. Zum Teil ist das eine Vertrauensfrage — um Erlaubnis für einen Scan zu bitten, bevor man sich irgendetwas verdient hat, ist ein schlechter erster Kontakt. Vor allem aber erfordert die Alternative ein Gespräch über Beauftragung, für das das Werkzeug noch niemandem einen Anlass gegeben hat.

## Was ich jemandem raten würde, der damit anfängt

Bauen Sie das Kostenmodell vor dem Scanner. Die Feeds sind Massenware und das Scannen ist gelöst; was das Ergebnis aussagekräftig macht, ist die unspektakuläre wirtschaftliche Modellierung darunter — und die dauert weit länger, als Sie einplanen.

Und widerstehen Sie dem Score. Jedes Gespräch wird Sie in Richtung einer Zahl drängen, einer Note, einer Farbe, weil man es gewohnt ist, so etwas in die Hand zu bekommen. Der gesamte Wert liegt in der Weigerung — Wahrscheinlichkeit und Schadenshöhe getrennt halten, Unsicherheit sichtbar lassen, Annahmen einsehbar machen —, damit jemand, der dem Ergebnis widerspricht, auf *die* Eingangsgröße zeigen kann, die er für falsch hält.

Dieser Streit ist das Produkt bei der Arbeit. Eine Heatmap hat noch nie jemandem etwas gegeben, das konkret genug war, um darüber zu streiten.
