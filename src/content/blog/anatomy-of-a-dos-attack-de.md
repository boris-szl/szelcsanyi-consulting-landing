---
title: Sechs Stunden bis zur Abwehr — Anatomie einer Verbindungsflut
date: 2026-08-13
lang: de
translationKey: anatomy-of-a-dos-attack
excerpt: Ein ungeschützter Origin-Server bekam eine anhaltende Flut auf Port 443, bis ihm die Dateideskriptoren ausgingen. Wie wir das diagnostiziert, an einem Nachmittag gestoppt haben — und warum es vermeidbar war.
seoTitle: "DoS-Angriff auf Port 443: Analyse und Abwehr"
seoDescription: >-
  Eine Verbindungsflut auf Port 443 erschöpfte die Dateideskriptoren eines Servers. Diagnose aus leeren Access-Logs und Abwehr an einem Nachmittag — die Analyse.
tags: Security, Incident Response, DevOps
readingTime: 8 Min. Lesezeit
firstHand: true
keyPoints:
  - >-
      Eine anhaltende Verbindungsflut auf Port 443 erschöpfte die offenen Dateideskriptoren des Servers; danach konnte nginx überhaupt keine neue Verbindung mehr annehmen.
  - >-
      Das Access-Log blieb über den gesamten Zeitraum leer: Die Verbindungen starben bei Accept und TLS, es erreichte also nie eine Anfrage die HTTP-Ebene.
  - >-
      Der Verkehr lag bei rund 8.000 bis 10.000 Paketen pro Sekunde, aber nur etwa 1 MB/s — das Verhältnis, das eine Verbindungsflut von echter Nutzlast unterscheidet.
  - >-
      Die Abhilfe bestand darin, den Origin hinter ein CDN zu legen und die Ports 80 und 443 in der Host-Firewall auf die veröffentlichten IP-Bereiche des Proxys zu beschränken.
  - >-
      Vollständig abgewehrt in etwa sechs Stunden, wovon der größte Teil auf die Diagnose entfiel und nicht auf die Behebung.
sources:
  - title: Understanding and Responding to Distributed Denial-of-Service Attacks
    url: https://www.cisa.gov/resources-tools/resources/understanding-and-responding-distributed-denial-service-attacks
    publisher: CISA, FBI und MS-ISAC
    note: Gemeinsamer Leitfaden zu volumetrischen, Protokoll- und Anwendungsschicht-Angriffen.
  - title: "nginx-Core-Modul: worker_connections und worker_rlimit_nofile"
    url: https://nginx.org/en/docs/ngx_core_module.html
    publisher: nginx
    note: Die beiden Direktiven, deren Standardwerte die Obergrenze für Dateideskriptoren setzen, die dieser Angriff ausgeschöpft hat.
  - title: ngx_http_limit_conn_module
    url: https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html
    publisher: nginx
    note: Begrenzung der Verbindungen je Schlüssel — die Maßnahme auf Origin-Seite, die eine Verbindungsflut abschwächt.
  - title: Cloudflare-IP-Bereiche
    url: https://www.cloudflare.com/ips/
    publisher: Cloudflare
    note: Die veröffentlichten CIDR-Blöcke, auf die die Firewall des Origins eingeschränkt wurde.
  - title: Under Attack mode
    url: https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/
    publisher: Cloudflare
    note: Die Challenge-Zwischenseite aus Schritt vier der Abwehr.
  - title: "CWE-400: Uncontrolled Resource Consumption"
    url: https://cwe.mitre.org/data/definitions/400.html
    publisher: MITRE
    note: Die Schwachstellenklasse, unter die dieser Vorfall fällt.
  - title: Denial of Service
    url: https://owasp.org/www-community/attacks/Denial_of_Service
    publisher: OWASP
    note: Hintergrund zu Angriffsmustern, die auf Ressourcenerschöpfung zielen.
---

*Dies ist eine anonymisierte Aufarbeitung eines realen Vorfalls, den ich bearbeitet habe. Kunde, IP-Adressen, Hostnamen und weitere identifizierende Angaben wurden entfernt oder verallgemeinert — es geht ausschließlich um die technischen Lehren.*

An einem Morgen war die Website eines Kunden — eine Marketing-Seite auf einem einzelnen Cloud-VPS — über HTTPS nicht mehr erreichbar. Nicht langsam. Weg. `curl` lieferte `HTTP 000`, der Browser drehte sich nur noch. Einfaches HTTP auf Port 80 antwortete weiterhin sofort, SSH lief, und die Maschine reagierte die ganze Zeit auf Ping. Genau diese Aufteilung — alles gesund außer 443 — ist die Signatur eines bestimmten Angriffstyps, und sie sagt einem, wo man suchen muss.

Am Ende des Nachmittags war der Angriff vollständig abgewehrt. Hier ist die Anatomie.

## Was tatsächlich passiert ist

Der Server bekam eine **Verbindungsflut auf Port 443**. Der Angreifer öffnete TLS-Verbindungen, so schnell er konnte, und schickte nie eine vollständige HTTP-Anfrage hinterher — gerade genug, damit nginx den Socket annahm und einen Dateideskriptor dafür reservierte. Multipliziert mit tausenden Verbindungen pro Sekunde erschöpft das die eine Ressource, an die niemand denkt, solange sie da ist: **offene Dateideskriptoren**.

War das Limit des Betriebssystems erreicht, konnte nginx *überhaupt keine* Verbindung mehr annehmen — weder vom Angreifer noch von echten Besuchern. Die Website war über HTTPS praktisch offline, während der Prozess festhing und nicht mehr vorankam.

## Die Spuren

Die Geschichte stand deutlich in den Logs — wenn man wusste, welches Log man lesen muss.

Das **Error-Log** von nginx war voll mit denselben zwei Zeilen, zehntausendfach:

```text
accept4() failed (24: Too many open files)
1024 worker_connections are not enough, reusing connections
```

Das **Access-Log** von nginx war im selben Zeitraum dagegen **vollständig leer**. Das ist der entscheidende Hinweis: Die Verbindungen erreichten nie die HTTP-Ebene. Sie starben bei Accept und TLS, es gab also nichts, was sich als Anfrage hätte protokollieren lassen. Wer nur Access-Logs und Dashboards zur Anfragerate beobachtet, für den ist ein solcher Angriff unsichtbar — die Anfragen, die man zählen würde, kommen nie zustande.

Die Messwerte des Hosts bestätigten das Bild:

- **CPU:** stundenlang bei 100 bis 150 Prozent festgenagelt, mit Spitzen über 200, gegenüber rund 5 Prozent im Ruhezustand. TLS-Handshakes sind das Teuerste, was ein HTTPS-Server tut, und der Angreifer erzwang eine Flut davon.
- **Eingehende Pakete:** rund 8.000 bis 10.000 pro Sekunde, bei nur etwa 1 MB/s. Dieses Verhältnis — viele Pakete, wenig Bandbreite, im Schnitt etwa 100 Byte pro Paket — spricht eindeutig für Verbindungsaufbau und nicht für echte Nutzlast.
- **Port 80:** antwortete durchgehend in 0,08 Sekunden mit einer 301-Weiterleitung. **Port 443:** tot.

Keine Anzeichen für Datenabfluss oder Kompromittierung. Das war reine Ressourcenerschöpfung — ein Denial of Service, nicht mehr, aber auch nicht weniger.

## Die Ursache (es war nicht der Angreifer)

Ob solche Angriffe gelingen, entscheidet sich an dem, was man *vorher* getan hat. Hier war der Origin-Server von einem Dritten aufgesetzt worden, ohne jede Grundabsicherung:

- **Die Origin-IP war direkt erreichbar.** Kein Reverse Proxy, kein CDN davor. Die öffentliche IP war über DNS auflösbar und wurde sogar im Reverse-DNS-Eintrag des Hosters preisgegeben — der Angreifer konnte also direkt auf die Maschine zielen und jede namensbasierte Abwehr umgehen.
- **Praktisch keine Firewall.** Port 443 nahm Verbindungen aus dem gesamten Internet an.
- **nginx war für eine Spielzeuglast konfiguriert.** `worker_connections` stand auf dem Standardwert `1024`, `worker_rlimit_nofile` war nie angehoben worden — die Obergrenze für Dateideskriptoren lag entsprechend niedrig und war leicht zu erreichen.
- **Keine Protokollierung auf Paketebene.** Das machte die nachträgliche Analyse deutlich mühsamer als nötig.

Die unbequeme Erkenntnis: Die Website war von einer Marketingagentur aufgesetzt worden, ohne jede sicherheitstechnische Prüfung. Das ist die eigentliche Schwachstelle — **wer die Website baut, sollte nicht zugleich das letzte Wort über ihre Absicherung haben, ohne dass jemand für die Härtung verantwortlich ist.**

## Die Abwehr

Die Maßnahme war gestaffelt: erst den Origin verbergen, dann nur noch den Schutzschild mit ihm sprechen lassen.

1. **Einen Reverse Proxy davorsetzen (Cloudflare).** Sämtliche DNS-Einträge der Domain wurden auf *proxied* umgestellt, sodass der gesamte Verkehr nun über das globale Netz des CDN läuft. TLS terminiert an dessen Edge, nicht mehr am Origin — und entscheidend: **die echte Server-IP ist von außen nicht mehr sichtbar**.
2. **Die Origin-Firewall auf die IP-Bereiche des CDN einschränken.** In der Host-Firewall wurden die Ports 443 und 80 auf *ausschließlich* die veröffentlichten IP-Bereiche des Proxys begrenzt (eine Handvoll IPv4- und IPv6-CIDR-Blöcke). Jeder andere Verbindungsversuch auf 443 wird nun am Netzrand verworfen, bevor er nginx überhaupt erreicht. Diese eine Regel senkte den Angriffsverkehr auf nahezu null.
3. **Die DNS-Hoheit zum Proxy verlagern**, um dessen Caching, WAF und DDoS-Funktionen durchgängig nutzen zu können.
4. **Den „Under Attack“-Modus aktivieren** — eine JavaScript-Challenge, die automatisierte Skripte und Bots herausfiltert und echte Besucher nach einer kurzen Zwischenseite durchlässt.
5. **Protokollierung auf Paketebene einrichten** (eine `iptables`-Log-Regel auf 443, über Neustarts hinweg persistent), damit der nächste Vorfall mit Beweisen beginnt und nicht mit Vermutungen.
6. **Missbrauchsmeldungen** bei den Hostern einreichen, aus deren Netzen der Verkehr stammte.

Innerhalb weniger Minuten nach dem Greifen der Firewall-Regel fiel die CPU auf Leerlauf zurück, die eingehenden Pakete gingen gegen null. Die Graphen des Hosts zeigten die Wirkung unmissverständlich: erst eine Wand aus Last, dann eine flache Linie.

## Was ich jedem mit einem eigenen Origin-Server rate

Der konkrete Angriff ist weniger wichtig als das Muster. Fünf Dinge hätten diesen Vorfall verhindert oder zumindest deutlich abgeschwächt:

- **Die Origin-IP niemals preisgeben.** Von Anfang an ein CDN oder einen Proxy davorsetzen und die Origin-IP wie ein Geheimnis behandeln. Die meisten dieser Angriffe verpuffen in dem Moment, in dem der Angreifer die Maschine nicht mehr findet.
- **Die Origin-Firewall auf die Bereiche des Proxys beschränken.** Ein CDN davor nützt nichts, solange der Angreifer die nackte IP weiterhin direkt erreicht. 80 und 443 auf die CIDR-Blöcke des Proxys begrenzen — das war hier die Regel, die die eigentliche Arbeit geleistet hat.
- **Für den Fehlerfall konfigurieren, nicht für die Demo.** `worker_connections` (4096 oder mehr) und `worker_rlimit_nofile` anheben, damit erschöpfte Dateideskriptoren nicht sofort alles lahmlegen.
- **Auf das richtige Signal schauen.** Dashboards zur Anfragerate zeigen eine Verbindungsflut nicht — die Anfragen kommen ja nie zustande. Beobachten Sie Verbindungszahlen, Pakete pro Sekunde, CPU und die *Error*-Logs.
- **Die Verantwortung für Sicherheit klar zuordnen.** Wer die Website baut, sollte nicht das letzte Wort darüber haben, wie sie verteidigt wird. Eine kurze Härtungsprüfung vor dem Livegang hätte jede der oben genannten Lücken geschlossen.

Der Angriff war in etwa sechs Stunden erledigt, wovon der größte Teil auf Diagnose und das korrekte Aufsetzen des Schutzschilds entfiel. Die Abwehr selbst — Origin verborgen, Firewall auf den Proxy beschränkt — ist nun dauerhaft. Solange die Origin-IP nicht öffentlich wird und der Proxy davor bleibt, hat derselbe Angriff schlicht kein Ziel mehr.

Langweilige, gestaffelte Verteidigung schlägt geschickte Reaktion. Fast immer.
