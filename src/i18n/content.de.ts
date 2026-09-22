/* ============================================================================
 *  German copy for the data in src/lib/content.ts and src/lib/roles.ts.
 *
 *  Kept apart from the English data rather than nested inside it so that the
 *  English objects stay readable and a missing translation is a visible gap
 *  rather than a silently duplicated English string.
 * ========================================================================== */

export interface ProjectDe {
  role: string
  /* Month abbreviations and "now" differ; an untranslated period is the kind
     of small leak that makes a localised page feel machine-made. */
  period: string
  status: string
  domain: string
  tagline: string
  summary: string
  problem: string
  work: string
  outcome: string
}

export const projectsDe: Record<string, ProjectDe> = {
  onduty: {
    role: 'Mitgründer & CTO',
    period: 'Jan. 2026 — heute',
    status: 'In Entwicklung',
    domain: 'Security- & Field-Ops-SaaS',
    tagline: 'Das digitale Rückgrat für moderne Außendienstteams.',
    summary:
      'Eine Cloud-Plattform, die Einsatzplanung, Wächterkontrolle, Zeiterfassung und Abrechnung zu einem Betriebssystem für Sicherheits- und Außendienstunternehmen zusammenführt.',
    problem:
      'Sicherheitsfirmen arbeiten mit Tabellen, WhatsApp und Übergaben auf Papier. Schichten, GPS-Check-ins, Arbeitszeitrecht (AZG) und Rechnungsstellung liegen an verschiedenen Orten und passen nie zusammen.',
    work: 'Ich verantworte Architektur und Entwicklung von Anfang bis Ende: Echtzeit-Ortung und GPS-geprüfte Check-ins, eine KI-gestützte Einsatzplanung, Arbeitszeit- und Kollektivvertragslogik, die beim Lesen berechnet wird, sowie eine Abrechnungsstrecke — alles DSGVO-konform und in Wien gehostet.',
    outcome:
      'Ein System vom Dienstplan bis zur Rechnung. Betreiber steuern ihre Teams in Echtzeit, statt den Tag im Nachhinein zu rekonstruieren.',
  },
  nisura: {
    role: 'Gründer & CTO',
    period: 'Juni 2026 — heute',
    status: 'In Entwicklung',
    domain: 'Cyber-Risiko-Quantifizierung',
    tagline: 'Ihre Angriffsfläche in Euro übersetzt.',
    summary:
      'Die europäische CRQ-Engine, die die externe Angriffsfläche eines Unternehmens in eine erwartete finanzielle Exponierung übersetzt — und die gesetzliche NIS2-Haftung abbildet.',
    problem:
      'Security-Teams ertrinken in CVSS-Werten und roten Dashboards, die die zwei Fragen der Geschäftsführung nie beantworten: Was kostet uns das, und wo haften wir unter NIS2?',
    work: 'Ich habe die Engine gebaut, die die externe Angriffsfläche erfasst, laufende Threat Intelligence (KEV, EPSS, NVD) und passive Scan-Signale einbezieht — nie fest verdrahtet — und daraus ein Modell für finanzielle Exponierung und NIS2-Haftung ableitet, samt eigenem Phishing-Simulationsprodukt hinter sauberer rechtlicher Absicherung.',
    outcome:
      'Eine führende Nischenposition für CRQ in der EU: Exponierung in Geld und gesetzlicher Haftung ausgedrückt, mit Quellenangabe für jede einzelne Zahl.',
  },
  booksecurity: {
    role: 'Lead Developer & Architekt',
    period: '2026 — heute',
    status: 'Live',
    domain: 'Sicherheitsdienste auf Abruf',
    tagline: 'Professioneller Schutz, in 60 Sekunden gebucht.',
    summary:
      'Ein mobiler Marktplatz, der Privatpersonen und Veranstalter in Dubai und Abu Dhabi mit SIRA-lizenzierten Sicherheitskräften verbindet — auf Abruf und ohne Vertragsbindung.',
    problem:
      'Eine geprüfte, lizenzierte Sicherheitskraft zu buchen bedeutete Telefonate, Verträge und Tage des Wartens — ohne jede Möglichkeit, Angebot und Buchung in Echtzeit zusammenzubringen.',
    work: 'Ich verantworte die Architektur: ein zweiseitiger Buchungsmarktplatz mit Lizenz- und Prüfprozessen, Echtzeit-Zuordnung und Disposition der Kräfte, Zahlungsabwicklung und einer mobilen App für beide Seiten.',
    outcome:
      'Schutz auf Abruf, in unter einer Minute vom Telefon aus gebucht — jede Sicherheitskraft SIRA-geprüft.',
  },
  yukbul: {
    role: 'Lead Developer & Architekt',
    period: '2026 — heute',
    status: 'Live',
    domain: 'Logistik / Frachtvermittlung',
    tagline: 'Nicht mehr nach Fracht suchen. Die Fracht findet Sie.',
    summary:
      'Eine Frachtvermittlung für türkische Lkw-Fahrer, die vollständig in WhatsApp läuft und Ladungsangebote automatisch nach Route und Fahrzeugtyp zuordnet.',
    problem:
      'Fahrer verfolgen dutzende unübersichtliche WhatsApp-Gruppen von Hand und scrollen nach Ladungen, die zu ihrer Route passen — und übersehen die meisten davon.',
    work: 'Ich habe die Matching-Engine entworfen, die unstrukturierte Gruppennachrichten auswertet, Route und Fahrzeuganforderungen extrahiert und jedem Fahrer nur die passenden Ladungen zurückspielt — dort, wo er ohnehin arbeitet: im Chat.',
    outcome:
      'Fahrer hören auf zu scrollen und bekommen passende Ladungen zugestellt, ohne eine neue App lernen zu müssen.',
  },
  'psm-austria': {
    role: 'Technischer Berater',
    period: '2024 — heute',
    status: 'Beratung',
    domain: 'Physische Sicherheitsdienste',
    tagline: 'Ihr Partner für professionelle Sicherheit.',
    summary:
      'Einer der etablierten Sicherheitsdienstleister Österreichs — über 800 geprüfte Fachkräfte in Veranstaltungs-, Objekt- und Personenschutz — auf dem Weg zu modernerem Betrieb.',
    problem:
      'Ein großer, stark außendienstgeprägter Betrieb mit jahrelang gewachsenen Prozessen brauchte einen belastbaren Weg von manueller Koordination zu digitalem Echtzeitbetrieb.',
    work: 'Ich berate zu Technologiestrategie und Architektur: wo digitalisiert werden sollte, was selbst gebaut und was zugekauft wird, und wie der Außendienst auf moderne, konforme Werkzeuge kommt, ohne laufende Einsätze zu stören.',
    outcome:
      'Eine pragmatische Roadmap, die aus einem erfahrenen Sicherheitsdienstleister Schritt für Schritt einen digital geführten Betrieb macht.',
  },
  easyprep: {
    role: 'Technischer Berater',
    period: '2026 — heute',
    status: 'Beratung',
    domain: 'EdTech / Prüfungsvorbereitung',
    tagline: 'Eine Lernplattform für die Prüfungen, auf die es ankommt.',
    summary:
      'Eine Schweizer Online-Plattform, die Lernende mit strukturierten Übungen und Rückmeldung auf Prüfungen mit hohem Einsatz vorbereitet.',
    problem:
      'Prüfungsvorbereitung verteilt sich auf PDFs, alte Fragensammlungen und Bauchgefühl — mit wenig Anhaltspunkten, ob jemand tatsächlich bereit ist.',
    work: 'Ich berate zu Plattformarchitektur und technischer Roadmap: wie Inhalte und Übungslogik verlässlich skalieren und wo Entwicklungsaufwand den größten Lernerfolg pro Franken bringt.',
    outcome:
      'Eine klarere technische Richtung für ein Lernprodukt, das am Prüfungstag verlässlich sein und zugleich günstig wachsen muss.',
  },
  'nu-education': {
    role: 'Software Engineering & Backend Lead',
    period: '2022 — 2025',
    status: 'Abgeschlossen',
    domain: 'EdTech · berufliche Bildung',
    tagline: 'Berufliche Bildung der nächsten Generation.',
    summary:
      'Eine Lernplattform für die berufliche Bildung in Zürich, bei der ich über dreieinhalb Jahre vom Entwickler zum Lead wurde und Backend und Delivery verantwortete.',
    problem:
      'Ein schnell wachsendes Lernprodukt brauchte ein Backend und eine Delivery-Strecke, die verlässlich skalieren, während das Team weiter Funktionen ausliefert.',
    work: 'Ich habe Backend-Entwicklung und Delivery geleitet: Spring-Boot-Services auf Kubernetes, CI/CD, Observability und die Zuverlässigkeitspraktiken, die kontinuierliches Ausliefern erst möglich machen — und ich habe die Entwickler um mich herum begleitet.',
    outcome:
      'Ein verlässliches Backend und eine Delivery-Strecke, die mit dem Produkt mitgewachsen sind. Aus dem Software Engineer wurde erst Backend Lead, dann Software Engineering Lead.',
  },
}

export interface ServiceDe {
  title: string
  summary: string
  detail: string
}

export const servicesDe: Record<string, ServiceDe> = {
  'S-01': {
    title: 'Fractional CTO & Architektur',
    summary: 'Die technische Richtung verantworten, nicht nur den Code.',
    detail:
      'Von der Produktarchitektur bei null bis zu Team- und Einstellungsentscheidungen. Ich setze die technische Richtung für junge Unternehmen und bleibe dafür verantwortlich, dass sie umgesetzt wird — wie ein Gründer, nicht wie ein Dienstleister auf der Durchreise.',
  },
  'S-02': {
    title: 'Backend & Plattform',
    summary: 'Systeme, die unter echter Last korrekt bleiben.',
    detail:
      'Domänenmodellierung, APIs, Echtzeit-Ortung und -Planung sowie Datenstrecken, gebaut für die Fehlerfälle. TypeScript, Node, Postgres und ereignisgetriebene Dienste — DSGVO-bewusst und in der EU gehostet, wo es darauf ankommt.',
  },
  'S-03': {
    title: 'Mobile Apps — React Native',
    summary: 'Eine Codebasis, iOS und Android, schnell ausgeliefert.',
    detail:
      'Plattformübergreifende Apps mit React Native und Expo — Echtzeit-Ortung, Offline-First-Daten, Push und native Anbindungen. So liefern die Außendienst-App von OnDuty und der Marktplatz von BookSecurity aus einem Team in beide Stores.',
  },
  'S-04': {
    title: 'Zuverlässigkeit & Performance',
    summary: 'Den Engpass finden, beseitigen, belegen.',
    detail:
      'Profiling, Query-Tuning, Caching und Observability, die man verteidigen kann. Ich messe zuerst und senke dann Latenz und Kosten dort, wo die Daten es sagen — nicht das Bauchgefühl.',
  },
  'S-05': {
    title: 'Delivery & DevOps',
    summary: 'Vom Laptop in die Produktion, wiederholbar.',
    detail:
      'CI/CD, Infrastructure as Code, Container und Release-Prozesse, mit denen kleine Teams ohne Angst täglich ausliefern. Langweilig, dokumentiert und schwer kaputtzubekommen.',
  },
  'S-06': {
    title: 'Technische Beratung',
    summary: 'Ein zweites erfahrenes Augenpaar.',
    detail:
      'Architektur-Reviews, Make-or-Buy-Entscheidungen, Sicherheits- und Compliance-Lage sowie ein Realitätscheck für die Roadmap. Teilzeit eingebunden oder projektweise — direkt, mit offen benannten Abwägungen.',
  },
}

export const statsDe: Record<string, string> = {
  'founding companies since': 'Unternehmen gründe ich seit',
  'startups co-founded · 1 exit': 'Startups mitgegründet · 1 Exit',
  'products led across EU, UAE & TR': 'Produkte verantwortet in EU, VAE & TR',
  'Vienna & St. Gallen · remote-first': 'Wien & St. Gallen · remote-first',
}

/*
  Testimonial roles only. The quotes themselves stay in English — they are
  verbatim LinkedIn endorsements, and translating someone else's words while
  still presenting them as a quotation would misrepresent them.
*/
export const testimonialRolesDe: Record<string, string> = {
  'Head of Product · nu.Education': 'Head of Product · nu.Education',
  'Software Engineer · nu.Education': 'Software Engineer · nu.Education',
  'CTO · was Boris’s manager at CLEO AG': 'CTO · war Boris’ Vorgesetzter bei CLEO AG',
  'Geschäftsführer · Astrotec': 'Geschäftsführer · Astrotec',
  'PSM Austria': 'PSM Austria',
  'CEO · Apapika': 'CEO · Apapika',
}
