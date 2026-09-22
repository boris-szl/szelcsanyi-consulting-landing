/* ============================================================================
 *  All user-facing copy, per locale.
 *
 *  Page prose lives here rather than inline in the .astro files so that the
 *  two language versions render from one set of components. A page that
 *  hard-codes its own sentences cannot be translated without being forked.
 * ========================================================================== */

const en = {
    nav: {
      work: 'Work',
      about: 'About',
      hiring: 'Hiring',
      blog: 'Writing',
      contact: 'Contact',
      bookCall: 'Book a call',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skipToContent: 'Skip to content',
      language: 'Language',
    },
    common: {
      readMore: 'Read',
      readCase: 'Read the case',
      allWork: 'All work',
      allWriting: 'All writing',
      allRoles: 'All roles',
      next: 'Next',
      nextUp: 'Next up',
      nextRole: 'Next role',
      relatedReading: 'Related reading',
      alsoIn: 'Also in',
      by: 'By',
      updated: 'Updated',
      sources: 'Sources',
      sourcesBlurb:
        'Primary references for the claims above. Standards and advisories are linked to the issuing body rather than to coverage of them.',
      inShort: 'In short',
      datasheet: 'datasheet',
      stack: 'stack',
      availability: 'availability',
      sitemap: 'Sitemap',
      direct: 'Direct',
      rssFeed: 'RSS feed',
      firstHandNote: ' · first-hand account',
      location: 'Vienna & St. Gallen',
      availabilityValue: 'Available Q3 · 2 slots',
      noTranslation: 'Not available in this language — go to the blog index',
      translatedFrom: 'Translated from {lang}',
      language_en: 'English',
      language_de: 'German',
      allReferences: 'All references',
      footerTagline:
        'I design, build, and lead the engineering behind security-tech and marketplace products.',
      footerRemote: 'Remote-first from {location}, working across {timezone}.',
    },
    home: {
      heroLead: 'Software engineering,',
      heroAccent: 'actually shipped',
      heroBody:
        'I’m a freelance engineer and fractional CTO. I’ve founded and led the engineering — web, backend, and React Native mobile — behind security-tech and marketplace products across the EU, the UAE, and Turkey, and I leave teams with systems they can run without me.',
      startProject: 'Start a project',
      seeWork: 'See the work',
      specRows: [
        ['role', 'Fractional CTO & engineer'],
        ['focus', 'Security-tech · marketplaces'],
        ['stack', 'TypeScript · Node · React · Postgres'],
        ['engagement', 'Founder · fractional · advisory'],
      ] as [string, string][],
      timezoneLabel: 'timezone',
      servicesEyebrow: 'What I do',
      servicesTitle: 'From architecture to mobile — the ways I help teams ship.',
      workEyebrow: 'Selected work',
      workTitle: 'Systems built to hold up under real traffic.',
      aboutEyebrow: 'About',
      aboutTitle: 'A senior engineer you can hand the hard part to.',
      aboutBody:
        'I’ve been the first engineer at seed-stage startups and the person brought in to steady systems at scale. I care about the unglamorous things — clear boundaries, honest observability, and code the next person can read.',
      aboutCta: 'More about me',
      writingEyebrow: 'Writing',
      writingTitle: 'Notes from the work.',
      hiringEyebrow: 'Hiring',
      hiringTitle: 'I also recruit senior tech talent — globally.',
      hiringBody:
        'Beyond building, I run searches for hard-to-find engineers and architects worldwide. Currently open:',
      testimonialsEyebrow: 'Endorsements',
      testimonialsTitle: 'What the people I’ve built with say.',
      testimonialsBody:
        'Verbatim from colleagues, managers, and clients — at nu.Education, CLEO AG, Astrotec, PSM Austria, and Apapika. Quotes appear in the language they were given in.',
    },
    cta: {
      title: 'Have a system that needs to hold up? Let’s talk about it.',
      body:
        'Tell me what you’re building and where it hurts. I’ll reply within a day with an honest read on whether — and how — I can help.',
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'The products I’ve founded, led, and advised.',
      intro:
        'Real ventures across security-tech, marketplaces, and edtech — in the EU, the UAE, and Turkey. Some I run as CTO; others I steer as an advisor.',
      problem: 'The problem',
      did: 'What I did',
      outcome: 'The outcome',
      visit: 'Visit',
      facts: { role: 'role', period: 'period', status: 'status', domain: 'domain' },
    },
    hiring: {
      eyebrow: 'Recruiting',
      title: 'I place senior tech talent — globally.',
      intro:
        'Alongside building, I recruit hard-to-find engineers and architects worldwide. These are the searches I’m running right now.',
      openRoles: 'open roles · worldwide',
      closing:
        'Hiring for something else — or looking for your next role? I keep a global network of senior engineers and architects. Reach out and tell me what you need.',
      about: 'About the role',
      responsibilities: 'What you’ll do',
      mustHave: 'What you need',
      mustHaveNote: 'must-have',
      niceToHave: 'What helps',
      niceToHaveNote: 'nice-to-have',
      offer: 'What’s on offer',
      howToApply: 'How to apply',
      howToApplyBody:
        'Send your CV and a line on why this role fits. Meeting most of the must-haves is enough — apply. All approaches are handled confidentially.',
      apply: 'Apply for this role',
      applyShort: 'Apply',
      applicationSubject: 'Application',
      roleSpec: 'role spec',
      facts: {
        role: 'role',
        discipline: 'discipline',
        location: 'location',
        type: 'type',
        client: 'client',
        status: 'status',
      },
    },
    about: {
      eyebrow: 'About',
      title: 'A senior engineer you can hand the hard part to.',
      howEyebrow: 'How I work',
      howTitle: 'Four habits I don’t compromise on.',
      pathEyebrow: 'Track record',
      pathTitle: 'Where I’ve been building.',
      eduEyebrow: 'Education',
      tools: 'Tools I reach for',
      workWithMe: 'Work with me',
      portraitAlt: 'Portrait of',
    },
    references: {
      eyebrow: 'References',
      title: 'What the people I’ve worked with say.',
      intro:
        'Endorsements from colleagues, managers, and clients across nu.Education, CLEO AG, Astrotec, PSM Austria, and Apapika.',
      note:
        'Each quote is reproduced as it was given. Where the original was in the other language, the translation is marked as such and the original wording is what appears in this page’s structured data.',
    },
    blog: {
      eyebrow: 'Writing',
      title: 'Notes from the work.',
      intro:
        'Field notes on building dependable systems, reading slow queries, and doing consulting that actually leaves a team stronger.',
      sourcesCount: 'sources',
      tagEyebrow: 'posts',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Book a call.',
      intro:
        'Grab a slot that suits you — 30 minutes, no pitch. Come with what you’re building, where it hurts, and roughly when. You’ll leave with an honest read on whether I can help.',
      booking: 'Booking',
      bookingFallback: 'Loading the scheduler. If it does not appear, email',
      bookingFallbackTail: 'and we will find a slot.',
      email: 'Email',
      basedIn: 'Based in',
      registeredOffice: 'Registered office',
      workingStyle: 'Working style',
      workingStyleValue: 'Remote-first, across EU / UAE / TR',
      elsewhere: 'Elsewhere',
    },
    notFound: {
      title: 'No route matched.',
      body:
        'The page you were after doesn’t exist — or has been refactored away. Let’s get you back to something that resolves.',
      home: 'Back to home',
      writing: 'Read the writing',
    },
}

/*
  The English copy is the contract: `typeof en` widens every value to string,
  so any key missing from the German object is a compile error rather than an
  `undefined` rendered into the page.
*/
export type UI = typeof en

export const ui: Record<'en' | 'de', UI> = {
  en,
  de: {
    nav: {
      work: 'Projekte',
      about: 'Über mich',
      hiring: 'Stellen',
      blog: 'Beiträge',
      contact: 'Kontakt',
      bookCall: 'Gespräch buchen',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      skipToContent: 'Zum Inhalt springen',
      language: 'Sprache',
    },
    common: {
      readMore: 'Lesen',
      readCase: 'Zum Projekt',
      allWork: 'Alle Projekte',
      allWriting: 'Alle Beiträge',
      allRoles: 'Alle Stellen',
      next: 'Weiter',
      nextUp: 'Als Nächstes',
      nextRole: 'Nächste Stelle',
      relatedReading: 'Weiterlesen',
      alsoIn: 'Auch auf',
      by: 'Von',
      updated: 'Aktualisiert',
      sources: 'Quellen',
      sourcesBlurb:
        'Primärquellen zu den obigen Aussagen. Standards und Advisories sind auf die herausgebende Stelle verlinkt, nicht auf Berichterstattung darüber.',
      inShort: 'Kurz gefasst',
      datasheet: 'Datenblatt',
      stack: 'Technologien',
      availability: 'Verfügbarkeit',
      sitemap: 'Übersicht',
      direct: 'Direkt',
      rssFeed: 'RSS-Feed',
      firstHandNote: ' · aus erster Hand',
      location: 'Wien & St. Gallen',
      availabilityValue: 'Verfügbar ab Q3 · 2 Plätze',
      noTranslation: 'In dieser Sprache nicht verfügbar — zur Beitragsübersicht',
      translatedFrom: 'Aus dem {lang} übersetzt',
      language_en: 'Englischen',
      language_de: 'Deutschen',
      allReferences: 'Alle Referenzen',
      footerTagline:
        'Ich entwerfe, baue und verantworte die Technik hinter Security- und Marktplatz-Produkten.',
      footerRemote: 'Remote-first aus {location}, tätig in {timezone}.',
    },
    home: {
      heroLead: 'Software, die',
      heroAccent: 'wirklich läuft',
      heroBody:
        'Ich bin freiberuflicher Entwickler und Fractional CTO. Ich habe die Technik hinter Security- und Marktplatz-Produkten in der EU, den VAE und der Türkei aufgebaut und verantwortet — Web, Backend und React-Native-Apps. Und ich hinterlasse Teams Systeme, die sie ohne mich betreiben können.',
      startProject: 'Projekt starten',
      seeWork: 'Projekte ansehen',
      specRows: [
        ['Rolle', 'Fractional CTO & Entwickler'],
        ['Fokus', 'Security-Tech · Marktplätze'],
        ['Stack', 'TypeScript · Node · React · Postgres'],
        ['Modell', 'Gründer · Fractional · Beratung'],
      ] as [string, string][],
      timezoneLabel: 'Zeitzone',
      servicesEyebrow: 'Was ich mache',
      servicesTitle: 'Von der Architektur bis zur App — so bringe ich Teams zum Liefern.',
      workEyebrow: 'Ausgewählte Projekte',
      workTitle: 'Systeme, die unter echter Last standhalten.',
      aboutEyebrow: 'Über mich',
      aboutTitle: 'Ein erfahrener Entwickler, dem Sie den schwierigen Teil übergeben können.',
      aboutBody:
        'Ich war erster Entwickler in Seed-Startups und der, den man holt, wenn ein gewachsenes System wieder ruhig laufen soll. Mir liegen die unspektakulären Dinge: klare Grenzen zwischen Komponenten, ehrliche Observability und Code, den der Nächste lesen kann.',
      aboutCta: 'Mehr über mich',
      writingEyebrow: 'Beiträge',
      writingTitle: 'Notizen aus der Arbeit.',
      hiringEyebrow: 'Stellen',
      hiringTitle: 'Ich vermittle außerdem erfahrene Tech-Spezialisten — weltweit.',
      hiringBody:
        'Neben dem Bauen suche ich weltweit schwer zu findende Entwickler und Architekten. Aktuell offen:',
      testimonialsEyebrow: 'Referenzen',
      testimonialsTitle: 'Was die Menschen sagen, mit denen ich gebaut habe.',
      testimonialsBody:
        'Wörtlich von Kolleginnen, Kollegen, Vorgesetzten und Kunden — bei nu.Education, CLEO AG, Astrotec, PSM Austria und Apapika. Zitate stehen in der Sprache, in der sie abgegeben wurden.',
    },
    cta: {
      title: 'Ein System, das halten muss? Sprechen wir darüber.',
      body:
        'Erzählen Sie mir, was Sie bauen und wo es hakt. Sie bekommen innerhalb eines Tages eine ehrliche Einschätzung, ob — und wie — ich helfen kann.',
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Die Produkte, die ich gegründet, geleitet und begleitet habe.',
      intro:
        'Echte Unternehmungen aus Security-Tech, Marktplätzen und EdTech — in der EU, den VAE und der Türkei. Einige führe ich als CTO, andere begleite ich beratend.',
      problem: 'Das Problem',
      did: 'Was ich gemacht habe',
      outcome: 'Das Ergebnis',
      visit: 'Besuchen:',
      facts: { role: 'Rolle', period: 'Zeitraum', status: 'Status', domain: 'Bereich' },
    },
    hiring: {
      eyebrow: 'Recruiting',
      title: 'Ich besetze erfahrene Tech-Positionen — weltweit.',
      intro:
        'Neben dem Bauen suche ich weltweit schwer zu findende Entwickler und Architekten. Das sind die Suchen, die gerade laufen.',
      openRoles: 'offene Stellen · weltweit',
      closing:
        'Sie suchen jemanden für eine andere Position — oder selbst Ihre nächste Rolle? Ich pflege ein weltweites Netzwerk erfahrener Entwickler und Architekten. Melden Sie sich und sagen Sie mir, was Sie brauchen.',
      about: 'Über die Position',
      responsibilities: 'Ihre Aufgaben',
      mustHave: 'Was Sie mitbringen',
      mustHaveNote: 'erforderlich',
      niceToHave: 'Was zusätzlich hilft',
      niceToHaveNote: 'wünschenswert',
      offer: 'Was geboten wird',
      howToApply: 'So bewerben Sie sich',
      howToApplyBody:
        'Senden Sie Ihren Lebenslauf und ein paar Zeilen dazu, warum die Position passt. Wenn Sie die meisten Anforderungen erfüllen, genügt das — bewerben Sie sich. Alle Anfragen werden vertraulich behandelt.',
      apply: 'Auf diese Stelle bewerben',
      applyShort: 'Bewerben',
      applicationSubject: 'Bewerbung',
      roleSpec: 'Eckdaten',
      facts: {
        role: 'Kennung',
        discipline: 'Fachgebiet',
        location: 'Einsatzort',
        type: 'Anstellung',
        client: 'Auftraggeber',
        status: 'Status',
      },
    },
    about: {
      eyebrow: 'Über mich',
      title: 'Ein erfahrener Entwickler, dem Sie den schwierigen Teil übergeben können.',
      howEyebrow: 'Wie ich arbeite',
      howTitle: 'Vier Gewohnheiten, bei denen ich keine Kompromisse mache.',
      pathEyebrow: 'Werdegang',
      pathTitle: 'Wo ich gebaut habe.',
      eduEyebrow: 'Ausbildung',
      tools: 'Womit ich arbeite',
      workWithMe: 'Zusammenarbeiten',
      portraitAlt: 'Porträt von',
    },
    references: {
      eyebrow: 'Referenzen',
      title: 'Was die Menschen sagen, mit denen ich gearbeitet habe.',
      intro:
        'Referenzen von Kolleginnen, Kollegen, Vorgesetzten und Kunden bei nu.Education, CLEO AG, Astrotec, PSM Austria und Apapika.',
      note:
        'Jedes Zitat ist so wiedergegeben, wie es abgegeben wurde. Wo das Original in der anderen Sprache verfasst war, ist die Übersetzung als solche gekennzeichnet; in den strukturierten Daten dieser Seite steht der Originalwortlaut.',
    },
    blog: {
      eyebrow: 'Beiträge',
      title: 'Notizen aus der Arbeit.',
      intro:
        'Notizen aus der Praxis: verlässliche Systeme bauen, langsame Queries lesen und beraten, sodass ein Team danach stärker dasteht.',
      sourcesCount: 'Quellen',
      tagEyebrow: 'Beiträge',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Gespräch buchen.',
      intro:
        'Suchen Sie sich einen passenden Termin — 30 Minuten, ohne Verkaufsgespräch. Bringen Sie mit, was Sie bauen, wo es hakt und bis wann. Sie gehen mit einer ehrlichen Einschätzung heraus, ob ich helfen kann.',
      booking: 'Terminbuchung',
      bookingFallback:
        'Der Kalender wird geladen. Falls er nicht erscheint, schreiben Sie an',
      bookingFallbackTail: '— dann finden wir einen Termin.',
      email: 'E-Mail',
      basedIn: 'Standort',
      registeredOffice: 'Firmensitz',
      workingStyle: 'Arbeitsweise',
      workingStyleValue: 'Remote-first, in EU / VAE / TR',
      elsewhere: 'Sonst noch',
    },
    notFound: {
      title: 'Keine Route gefunden.',
      body:
        'Die gesuchte Seite gibt es nicht — oder sie wurde wegrefaktoriert. Zurück zu etwas, das auflöst.',
      home: 'Zur Startseite',
      writing: 'Beiträge lesen',
    },
  },
}
