---
title: Durch ein Google-Suchergebnis, nicht durch das Monitoring — Analyse eines WordPress-Zero-Days
date: 2026-09-17
lang: de
translationKey: wordpress-zero-day-post-mortem
excerpt: Eine Website war zehn Tage lang über eine WordPress-Sicherheitslücke vollständig kompromittiert. Die Betreiber trifft keine Schuld, erkannt hat es keines der laufenden Systeme — und nachweisen ließ sich das Einfallstor nur über zwei Datenbankzeilen, die der Angreifer nicht löschen konnte.
seoTitle: "WordPress gehackt: Zero-Day, zehn Tage unbemerkt"
seoDescription: >-
  Eine WordPress-Sicherheitslücke gab einem Angreifer in 93 Sekunden Admin-Rechte. Zehn Tage unbemerkt, aufgefallen durch ein Google-Ergebnis — die Analyse.
tags: Security, Incident Response, WordPress, Forensik
readingTime: 10 Min. Lesezeit
draft: false
firstHand: true
keyPoints:
  - >-
      Eine WordPress-Core-Zero-Day-Kette (CVE-2026-63030 mit CVE-2026-60137) führte in 93 Sekunden von einer unauthentifizierten HTTP-Anfrage zur funktionierenden Kommando-Shell.
  - >-
      Der Patch war seit 46 Tagen öffentlich. Automatische Core-Updates waren auf allen Sites deaktiviert, ohne dass es jemandem auffiel.
  - >-
      Die Kompromittierung blieb 10,3 Tage unentdeckt und wurde über ein Google-Suchergebnis mit eingeschleustem Casino-Spam gefunden, nicht durch Monitoring.
  - >-
      Vier von fünf Sites teilten einen Systembenutzer, sodass eine kompromittierte Site die Datenbank-Zugangsdaten aller vier offenlegte. Die fünfte blieb unberührt.
  - >-
      Die Log-Aufbewahrung lag bei rund 10 Tagen — kürzer als die Verweildauer. Nur ein Backup vor der Bereinigung bewahrte die Logs von Tag null.
sources:
  - title: "CVE-2026-63030 — WordPress REST-API-Batch-Route-Confusion mit Remote-Code-Execution"
    url: https://www.cve.org/CVERecord?id=CVE-2026-63030
    publisher: CVE Program
    note: Die Route-Desynchronisation der Kette. Betrifft WordPress 6.9.x vor 6.9.5 und 7.0.x vor 7.0.2.
  - title: "CVE-2026-60137 — SQL-Injection über author__not_in in WP_Query"
    url: https://www.cve.org/CVERecord?id=CVE-2026-60137
    publisher: CVE Program
    note: Die Injection-Hälfte. WP_Query bereinigt author__not_in nicht korrekt, wenn der Parameter als Skalar statt als Array ankommt.
  - title: WordPress Security Releases
    url: https://wordpress.org/news/category/security/
    publisher: WordPress
    note: Hier werden Core-Sicherheitsreleases veröffentlicht — darunter jenes, das diese Kette 46 Tage vor der Kompromittierung geschlossen hat.
  - title: Known Exploited Vulnerabilities (KEV) Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    publisher: CISA
    note: Beide CVEs wurden wenige Tage nach der Offenlegung als aktiv ausgenutzt geführt — das Signal, das aus „bald patchen“ ein „jetzt patchen“ macht.
  - title: Hardening WordPress
    url: https://wordpress.org/documentation/article/hardening-wordpress/
    publisher: WordPress
    note: Dateirechte, Benutzertrennung und die Grundlinie, die diese Installation nicht erfüllt hat.
  - title: "wp-config.php — Authentifizierungsschlüssel und Salts"
    url: https://developer.wordpress.org/apis/wp-config-php/#security-keys
    publisher: WordPress
    note: Deren Rotation ist es, die nach einer Kompromittierung alle bestehenden Sitzungen ungültig macht.
  - title: "Verordnung (EU) 2016/679 (DSGVO) — Artikel 33 und 34"
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj
    publisher: EUR-Lex
    note: Die Meldepflichten, die ein bestätigter unbefugter Zugriff auf personenbezogene Daten auslösen kann. Maßgeblich ist die hinreichende Wahrscheinlichkeit des Zugriffs, nicht der Nachweis eines Abflusses.
---

*Dies ist eine anonymisierte Aufarbeitung eines realen Vorfalls, den ich bearbeitet habe. Kunde, Domains, IP-Adressen, Kontonamen und Dateipfade wurden entfernt oder verallgemeinert — CVEs, Versionsnummern, Zeiträume und Zahlen sind unverändert, denn daraus lässt sich etwas lernen.*

Aufgefallen ist die Website nicht durch einen Nutzer, einen Alarm oder ein Monitoring-System. Aufgefallen ist sie durch ein Google-Suchergebnis.

Jemand suchte nach dem Unternehmen und fand einen Treffer, der unter der Domain des Kunden ein türkisches Online-Casino bewarb. Ein Klick darauf zeigte eine völlig normale Startseite. Genau diese Diskrepanz — Spam im Index, saubere Seite im Browser — ist die Signatur von **Cloaking**: Inhalte, die nur an Suchmaschinen-Crawler ausgeliefert und vor menschlichen Besuchern verborgen werden. Sie bedeutet zugleich, dass der Fehler lange genug bestand, damit Google ihn crawlen, indexieren und ranken konnte.

Als das endlich jemandem auffiel, saß der Angreifer bereits **zehn Tage und acht Stunden** im System.

## Niemand hat etwas falsch gemacht

Das gehört an den Anfang, denn der Reflex nach einer WordPress-Kompromittierung ist die Suche nach dem unachtsamen Menschen.

Den gab es hier nicht. Kein schwaches Passwort. Kein Phishing. Keine wiederverwendeten Admin-Zugangsdaten, kein bösartiges Plugin, das jemand wider besseres Wissen installiert hätte, keine Agentur, die eine Backup-Datei im Webroot liegen ließ. Der Exploit **benötigte überhaupt keine Authentifizierung**. Jeder im Internet, der die Website erreichen konnte, konnte ihn ausführen — und der Proof-of-Concept war öffentlich.

Die Website lief mit WordPress 6.9.4. Behoben war sie in 6.9.5 — veröffentlicht **46 Tage zuvor**.

Das ist die ganze Geschichte: ein Core-Zero-Day, ein öffentlicher Exploit und ein Patch, der existierte, aber nicht eingespielt war. Alles Weitere in diesem Beitrag ist Folge davon.

## Wie der Angriff ablief

Der Exploit — öffentlich als *wp2shell* im Umlauf — verkettet zwei am selben Tag offengelegte WordPress-Core-Schwachstellen. Keine davon führt für sich zu Codeausführung. Zusammen bringen sie eine anonyme HTTP-Anfrage bis zum Administrator.

Unangenehm daran ist: **jeder Schritt lässt WordPress die schädliche Aktion selbst ausführen**. Bis ganz zum Schluss läuft kein fremder Code. Die Artefakte sehen aus wie gewöhnliche Anwendungsausgaben — genau deshalb hat nichts angeschlagen.

**Schritt 1 — Route-Confusion im REST-Batch-Endpunkt ([CVE-2026-63030](https://www.cve.org/CVERecord?id=CVE-2026-63030)).** Der Batch-Endpunkt bündelt mehrere API-Aufrufe zu einer Anfrage und verwaltet sie in drei parallelen Arrays: Anfragen, Handler, Validierungsergebnisse. Eine gezielt fehlerhaft gebaute Teilanfrage wird dem Validierungs-Array hinzugefügt, im Handler-Array aber übersprungen. Die Arrays verschieben sich gegeneinander, und eine Anfrage, die die Validierung bestanden hat, wird unter dem Handler einer *anderen* Anfrage ausgeführt — mitsamt Rechte- und Methodenprüfungen, die nie für sie gedacht waren.

In den Logs sieht das nach fast nichts aus:

```text
POST //?_w2s=…  HTTP/2.0"  207
```

Pfade mit doppeltem und dreifachem Schrägstrich, dazu `HTTP 207 Multi-Status`-Antworten. Dreißig Sekunden davon. Wer nicht gezielt nach dem Batch-Endpunkt sucht, liest das als Rauschen.

**Schritt 2 — SQL-Injection ([CVE-2026-60137](https://www.cve.org/CVERecord?id=CVE-2026-60137)).** Die desynchronisierte Anfrage landet auf dem Parameter `author__not_in` von `WP_Query`. Als skalarer String statt als Array übergeben, rutscht er an der Bereinigung vorbei und wird direkt in rohes SQL interpoliert. Ein `UNION`-basierter Lesezugriff holt dann beliebige Werte aus der Datenbank, zurückgegeben in der Form eines Blogbeitrags.

Dafür gibt es ein verlässliches Erkennungsmerkmal. Inmitten einer Serie kleiner Batch-Antworten kam eine einzelne mit **1.242.468 Byte** zurück — drei Größenordnungen über ihren Nachbarn. Das ist kein API-Aufruf. Das ist eine Datenbank, die ausgelesen wird.

**Schritt 3 — Rechteausweitung ohne Passwort.** Das ist der raffinierte Teil. Das gefälschte Abfrageergebnis vergiftet den In-Memory-Objektcache von WordPress. Anschließend missbraucht der Angreifer die oEmbed-Funktion, um dieses vergiftete Objekt als echte `oembed_cache`-Zeile in der Datenbank zu verankern — und formt es über ein Cache-Abgleich-Gadget und eine selbstreferenzierende Parent-Schleife in ein `customize_changeset` um.

Das Anwenden eines Changesets läuft mit der Autorität von **Benutzer-ID 1**. In diesem Fenster geliehener Autorität wird eine zuvor abgewiesene Anfrage zum Anlegen eines Administrators erneut gesendet — und diesmal geht sie durch.

**Schritt 4 — Codeausführung.** Mit einem echten Administrator-Konto in der Hand meldete sich der Angreifer an und lud ein Plugin hoch. Das ist kein Exploit mehr. Das ist Tagesgeschäft. Das Plugin registrierte eine unauthentifizierte REST-Route, die base64-kodierte Shell-Befehle entgegennahm und deren Ausgabe zurückgab.

Zeit vom Erstkontakt bis zur funktionierenden Kommando-Shell: **93 Sekunden.**

## Die zwei Zeilen, die der Angreifer nicht löschen konnte

Der Exploit räumt auf. Er entfernt sein eigenes Administrator-Konto und beseitigt seine Webshell. Die Log-Aufbewahrung auf dem Host lag bei rund zehn Tagen — kürzer als die Verweildauer —, sodass die Logs von Tag null bereits rotiert waren, als jemand nachsah. Auf dem Papier hätte das ein Vorfall werden müssen, bei dem man sagt: *„vermutlich WordPress, vermutlich ein Plugin“* — und weitergeht.

Nur hinterlässt der Trick zur Rechteausweitung zwei Zeilen in der Datenbank, und die sind bauartbedingt schwer zu entfernen:

- eine `oembed_cache`-Zeile — das vergiftete Cache-Objekt
- eine `customize_changeset`-Zeile, `post_author = 1`, geschrieben in derselben Sekunde, in der der Fremd-Administrator angelegt wurde, noch immer mit der Markierung des Proof-of-Concept: `"title":"proof"`

Beide lagen elf Tage später unverändert in der produktiven Datenbank.

Das ist der Unterschied zwischen einer vermuteten und einer bewiesenen Ursache. Diese Zeilen sind der Grund, warum im Bericht steht: *„die Kette lief um 16:11:32 durch und war erfolgreich“* — statt *„die Website wurde vermutlich über eine Schwachstelle kompromittiert“*. Der Angreifer hat hinter sich aufgeräumt — nur nicht dort, wo sich nichts wegräumen lässt.

Die andere Hälfte der Rettung war organisatorisch: **die Beweissicherung erfolgte vor der Bereinigung**, einschließlich eines vollständigen Server-Backups aus der Zeit davor. Als sich herausstellte, dass die Live-Logs von Tag null bereits rotiert waren, lagen sie in diesem Backup noch vor. Hätten wir zuerst bereinigt und danach untersucht — der Reflex, wenn die Domain eines Kunden Casino-Spam an Google ausliefert —, wäre das Einfallstor nicht mehr feststellbar gewesen.

> Bereinigen kommt an zweiter Stelle. Was Sie löschen, um die Website zu retten, ist zugleich der Beweis dafür, wie jemand hineinkam.

## Ein Benutzer, vier Datenbanken

Die Kompromittierung reichte genau so weit, wie das Dateisystem es zuließ — und das betraf deutlich mehr als eine Website.

Auf dem Server lagen fünf WordPress-Websites. **Vier davon liefen unter einem einzigen Systembenutzer.** Die allerersten Befehle des Angreifers nach Erlangen der Shell lasen sämtliche `wp-config.php`-Dateien auf der Maschine aus und durchsuchten das Dateisystem nach Passwörtern, API-Schlüsseln und Tokens — also Datenbank-Zugangsdaten und Authentifizierungs-Salts für alle vier, nicht nur für die verwundbare.

Die fünfte Website lief unter einem eigenen Systembenutzer. Sie wurde sondiert. Sie blieb unberührt. Derselbe Server, derselbe Angreifer, dieselben zehn Tage — der einzige Unterschied war eine Benutzergrenze.

Das ist das gesamte Argument für saubere Trennung, geliefert als kontrollierter Versuch, den niemand durchführen wollte. Aus einer Schwachstelle in einer Website wurde die Preisgabe der Zugangsdaten von vier Websites, allein wegen des Zuschnitts des Hostings.

Ebenso genau gehört die Grenze benannt: Der Angreifer agierte als Web-Benutzer, nie als root. Die SSH-Authentifizierungsprotokolle über den gesamten Zeitraum zeigen, dass sich der Exploit überhaupt nie per SSH authentifiziert hat, und es gab keine root-eigene Persistenz — kein Cron, keine SUID-Binaries, keine Schlüssel. Der Radius blieb auf die Web-Anwendungsebene beschränkt. Diese Ebene war nur *breiter*, als sie hätte sein müssen.

## Drei Zahlen, drei Versäumnisse

Lässt man die Technik beiseite, bleiben drei Zeiträume — und jeder davon ist ein eigenes Versäumnis:

**46 Tage** — so lange war der Patch öffentlich, bevor die Kompromittierung stattfand. Automatische Updates waren auf allen Websites deaktiviert. Das ist die Hauptursache und zugleich die billigste denkbare Abhilfe.

**10,3 Tage** — Verweildauer. Nichts schlug an, als ein unauthentifiziert erzeugtes Administrator-Konto auftauchte, ein Plugin-Verzeichnis mit zufälligem Hex-Namen erschien oder eine Backdoor **7.174-mal** aufgerufen wurde. Die Entdeckung kam von außen, über eine Suchmaschine, sechs Tage nachdem die Spam-Nutzlast überhaupt platziert worden war.

**~10 Tage** — Log-Aufbewahrung. Kürzer als die Verweildauer. Das ist die unauffällige Kennzahl — und die, die am häufigsten zu knapp bemessen wird: *Ihr Aufbewahrungsfenster muss länger sein als eine realistische Verweildauer, sonst laufen Ihre Logs ab, bevor Sie merken, dass Sie sie brauchen.* Zehn Tage Aufbewahrung bedeuten, dass jeder Vorfall, der länger als zehn Tage dauert, bauartbedingt allein aus Logs nicht mehr aufklärbar ist.

## Was ich jedem WordPress-Betreiber rate

Der konkrete Exploit ist in einem Jahr bedeutungslos. Sein Muster nicht.

- **Automatische Core-Updates aktivieren — und danach prüfen, ob sie gelaufen sind.** Nicht „wir haben einen Patch-Prozess“, sondern: nachsehen, ob eine Website tatsächlich die Version gewechselt hat. Der Fehlerfall hier waren deaktivierte Auto-Updates, die 46 Tage lang niemandem auffielen.
- **Ein Systembenutzer pro Website. Immer.** Das ist die eine Änderung, die aus der Preisgabe von vier Datenbanken einen Vorfall auf einer einzigen Website gemacht hätte. Beim Aufsetzen kostet sie nichts; nachträglich ist sie schmerzhaft.
- **Aufbewahrung länger ansetzen als die plausible Verweildauer.** Sechzig bis neunzig Tage. Wer leise hereinkommt, bleibt Wochen — und ein Zehn-Tage-Fenster garantiert, dass Sie einen bereits gewischten Tatort untersuchen.
- **Auf das Anlegen von Administrator-Konten alarmieren.** Ein seltenes, aussagekräftiges, trivial überwachbares Ereignis. Es hätte hier zehn Tage auf Minuten reduziert und kostet vielleicht eine halbe Stunde Einrichtung.
- **Entwicklungs-Websites aus dem öffentlichen Internet nehmen.** Die Staging-Kopie erhielt im selben Zeitraum rund 1.470 Exploit-Versuche. Dass sie nicht durchkamen, war Glück, keine Architektur.
- **Sichern, bevor Sie bereinigen.** Logs, Datenbank und Datei-Zeitstempel *zuerst* vom Host kopieren, hashen — und erst dann bereinigen.
- **Wo personenbezogene Daten betroffen sind, ist der technische Bericht nicht das letzte Wort.** Ein bestätigter unbefugter Zugriff auf Systeme mit personenbezogenen Daten kann Meldepflichten nach [DSGVO Art. 33 und 34](https://eur-lex.europa.eu/eli/reg/2016/679/oj) auslösen, und maßgeblich ist in der Regel die *hinreichende Wahrscheinlichkeit* eines Zugriffs, nicht der Nachweis eines Abflusses. Nachgewiesener Shell-Zugriff mit Lesezugriff auf Datenbanken ist für diese Prüfung erheblich. Die Entscheidung liegt bei der Rechtsberatung, nicht bei der Person, die die Forensik gemacht hat — deren Aufgabe ist es, die Fakten dafür zu liefern und ehrlich zu benennen, was die Logs nicht ausschließen können.

## Der unangenehme Teil

Ich kann exakt sagen, was der Angreifer getan hat, weil die Datenbank eine Quittung aufbewahrt hat. Ich kann sagen, was er zu lesen *imstande* war — vier Website-Datenbanken, einschließlich Kontaktformular-Einträgen —, weil die Shell zehn Tage lang genau diesen Zugriff hatte.

Was ich nicht sagen kann: was tatsächlich gelesen wurde. Die Zugriffsprotokolle erfassen keine Request-Bodies. Diese Information ist schlicht nicht mehr vorhanden, und keine noch so sorgfältige Forensik holt sie zurück.

Also steht genau das im Bericht, mit diesen Worten, und jede Feststellung ist als *Bestätigt* oder *Bewertet* gekennzeichnet. In der Incident Response gibt es eine echte Versuchung, eine Lücke in der Beweislage mit sicherem Ton zu überdecken, weil ein Kunde in einer schlechten Woche Gewissheit will. Sie ihm zu geben, obwohl man sie nicht hat, ist genau der Weg, auf dem ein technischer Bericht am Ende eine rechtliche Entscheidung in die Irre führt.

Die Eindämmung war in weniger als einem Tag erledigt, nachdem wir Bescheid wussten. Bis wir überhaupt Bescheid wussten, vergingen zehn Tage — und kam nur zustande, weil eine Suchmaschine uns darauf gestoßen hat.

Langweilige, überprüfbare Verteidigung schlägt geschickte Reaktion. Fast immer.
