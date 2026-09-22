/* ============================================================================
 *  About-page content in both locales.
 *
 *  The biography paragraphs carry inline emphasis, so they are stored as HTML
 *  fragments and rendered with set:html. They are authored here, not supplied
 *  by anyone else, so there is no untrusted input involved.
 * ========================================================================== */

export interface Principle {
  title: string
  body: string
}

export interface TimelineEntry {
  period: string
  role: string
  org: string
  note: string
}

export interface EducationEntry {
  period: string
  degree: string
  org: string
  note: string
}

export interface AboutContent {
  intro: (years: number, location: string) => string
  bio: string[]
  principles: Principle[]
  timeline: TimelineEntry[]
  education: EducationEntry[]
  caption: string
}

export const about: Record<'en' | 'de', AboutContent> = {
  en: {
    intro: (years, location) =>
      `I’m a freelance software engineer and fractional CTO based in ${location}. I build and lead the engineering behind security-tech and marketplace products.`,
    bio: [
      'I’ve spent the last {years} years building software that other people depend on — and, since co-founding my first startup in 2018, founding the companies that ship it. Today I’m Co-Founder &amp; CTO of <strong>OnDuty</strong>, Founder &amp; CTO of <strong>Nisura</strong>, and the lead engineer or technical advisor behind several products across the EU, the UAE, and Turkey.',
      'My work clusters around two worlds: <strong>security-tech</strong> — where real-time operations, compliance, and trust are non-negotiable — and <strong>marketplaces</strong>, where the hard part is matching supply to demand fast and reliably. Before going independent I led backend engineering at <strong>nu. education</strong> in Zurich, and earlier co-founded <strong>Advertilio</strong>, a computer-vision startup we later exited.',
      'I studied Technical Mathematics at TU Wien and Computer Science at the University of St.Gallen — foundations I lean on daily. But what I actually enjoy is the unglamorous part: clear service boundaries, honest observability, working-time and compliance logic that holds up, and code the next engineer can read without me in the room. I like being the person a team can hand the hard part to — and trust to hand it back working.',
      'I also <strong>recruit senior tech talent globally</strong> — engineers and architects, including current searches for OT/ICS and IT-infrastructure architects on critical-infrastructure programmes. If you’re hiring for something hard to fill, or looking for your next role, that network is open to you.',
    ],
    principles: [
      {
        title: 'Own the outcome, not the ticket',
        body: 'I take responsibility for the system working in production — not just for the code I was handed. That founder’s reflex is what I bring to every engagement.',
      },
      {
        title: 'Boring where it counts',
        body: 'I spend novelty budget on the core problem and reach for proven, well-understood technology everywhere else. Reliability compounds; cleverness rarely does.',
      },
      {
        title: 'Instrument, then decide',
        body: 'No performance work, no architecture call, and no rewrite without data first. I measure, then move — and I keep the trade-offs visible the whole way.',
      },
      {
        title: 'Leave it maintainable',
        body: 'Good consulting makes itself replaceable. I write the runbooks, pair with your team, and hand back systems people can run without me.',
      },
    ],
    timeline: [
      {
        period: 'Jun 2026 — now',
        role: 'Founder & CTO',
        org: 'Nisura',
        note: 'The European CRQ engine — translating an attack surface into financial exposure and NIS2 liability.',
      },
      {
        period: 'Jan 2026 — now',
        role: 'Co-Founder & CTO',
        org: 'OnDuty AI',
        note: 'The digital backbone for modern field teams — I architect and lead the development.',
      },
      {
        period: '2026 — now',
        role: 'Lead Engineer & Technical Advisor',
        org: 'BookSecurity · Yükbul · EasyPrep',
        note: 'Architecting and advising marketplaces and platforms across the UAE, Turkey, and Switzerland.',
      },
      {
        period: '2024 — now',
        role: 'Technical Advisor',
        org: 'PSM Austria',
        note: 'Technology strategy and architecture for an established Austrian security operator, including incident response.',
      },
      {
        period: '2022 — 2025',
        role: 'Software Engineering Lead → Backend Lead',
        org: 'nu. education — Zurich',
        note: 'Grew from engineer to lead over 3.5 years, building next-gen vocational learning on Spring Boot and Kubernetes.',
      },
      {
        period: '2022 — 2023',
        role: 'Software Consultant & Engineer',
        org: 'CLEO AG — Zurich',
        note: 'Consulting and delivery on Spring Boot / Spring MVC systems.',
      },
      {
        period: '2018 — 2020',
        role: 'Co-Founder',
        org: 'Advertilio GmbH — Vienna',
        note: 'Deep-tech startup using computer vision and ML to read visual appearance and body language in real time for DOOH. Acquired.',
      },
    ],
    education: [
      {
        period: '2025 — 2026',
        degree: 'MSc, Computer Science',
        org: 'University of St.Gallen (HSG)',
        note: 'Left to focus on my own ventures.',
      },
      {
        period: '2021 — 2024',
        degree: 'BSc, Technical Mathematics · Minor in Computer Science',
        org: 'TU Wien',
        note: 'Software quality assurance, JUnit, and the mathematical foundations behind the systems I build.',
      },
      {
        period: '2019 — 2023',
        degree: 'BA, Business Administration · Business Informatics',
        org: 'University of St.Gallen (HSG)',
        note: 'Thesis: “Investigation of Software Architectures for Smart Manufacturing Systems” (Prof. Dr. Ronny Seiger).',
      },
    ],
    caption: 'Founder & CTO',
  },

  de: {
    intro: (years, location) =>
      `Ich bin freiberuflicher Softwareentwickler und Fractional CTO mit Sitz in ${location}. Ich baue und verantworte die Technik hinter Security- und Marktplatz-Produkten.`,
    bio: [
      'Seit {years} Jahren baue ich Software, auf die sich andere verlassen — und seit der Mitgründung meines ersten Startups 2018 auch die Unternehmen, die sie ausliefern. Heute bin ich Mitgründer und CTO von <strong>OnDuty</strong>, Gründer und CTO von <strong>Nisura</strong> sowie leitender Entwickler oder technischer Berater hinter mehreren Produkten in der EU, den VAE und der Türkei.',
      'Meine Arbeit sammelt sich in zwei Welten: <strong>Security-Tech</strong>, wo Echtzeitbetrieb, Compliance und Vertrauen nicht verhandelbar sind, und <strong>Marktplätze</strong>, wo die eigentliche Schwierigkeit darin liegt, Angebot und Nachfrage schnell und verlässlich zusammenzubringen. Vor der Selbstständigkeit habe ich die Backend-Entwicklung bei <strong>nu. education</strong> in Zürich geleitet, davor <strong>Advertilio</strong> mitgegründet — ein Computer-Vision-Startup, das wir später verkauft haben.',
      'Ich habe Technische Mathematik an der TU Wien und Informatik an der Universität St.Gallen studiert — Grundlagen, auf die ich täglich zurückgreife. Was mir tatsächlich Freude macht, ist aber der unspektakuläre Teil: klare Schnittstellen zwischen Diensten, ehrliche Observability, Arbeitszeit- und Compliance-Logik, die standhält, und Code, den der nächste Entwickler ohne mich im Raum lesen kann. Ich bin gern derjenige, dem ein Team den schwierigen Teil übergeben kann — und der ihn funktionierend zurückgibt.',
      'Außerdem <strong>vermittle ich weltweit erfahrene Tech-Fachkräfte</strong> — Entwickler und Architekten, derzeit unter anderem für OT-/ICS- und IT-Infrastrukturpositionen in KRITIS-Programmen. Wenn Sie eine schwer zu besetzende Stelle haben oder selbst Ihre nächste Rolle suchen, steht Ihnen dieses Netzwerk offen.',
    ],
    principles: [
      {
        title: 'Das Ergebnis verantworten, nicht das Ticket',
        body: 'Ich übernehme Verantwortung dafür, dass das System in Produktion läuft — nicht nur für den Code, den man mir gegeben hat. Diesen Gründerreflex bringe ich in jedes Mandat mit.',
      },
      {
        title: 'Langweilig, wo es zählt',
        body: 'Ich gebe mein Neuheitsbudget für das Kernproblem aus und greife überall sonst zu bewährter, gut verstandener Technik. Verlässlichkeit summiert sich; Cleverness selten.',
      },
      {
        title: 'Erst messen, dann entscheiden',
        body: 'Keine Performance-Arbeit, keine Architekturentscheidung und kein Rewrite ohne Daten. Ich messe zuerst und bewege mich dann — und halte die Abwägungen durchgehend sichtbar.',
      },
      {
        title: 'Wartbar hinterlassen',
        body: 'Gute Beratung macht sich selbst ersetzbar. Ich schreibe die Runbooks, arbeite mit Ihrem Team zusammen und gebe Systeme zurück, die man ohne mich betreiben kann.',
      },
    ],
    timeline: [
      {
        period: 'Juni 2026 — heute',
        role: 'Gründer & CTO',
        org: 'Nisura',
        note: 'Die europäische CRQ-Engine — sie übersetzt eine Angriffsfläche in finanzielle Exponierung und NIS2-Haftung.',
      },
      {
        period: 'Jan. 2026 — heute',
        role: 'Mitgründer & CTO',
        org: 'OnDuty AI',
        note: 'Das digitale Rückgrat für moderne Außendienstteams — ich verantworte Architektur und Entwicklung.',
      },
      {
        period: '2026 — heute',
        role: 'Leitender Entwickler & technischer Berater',
        org: 'BookSecurity · Yükbul · EasyPrep',
        note: 'Architektur und Beratung für Marktplätze und Plattformen in den VAE, der Türkei und der Schweiz.',
      },
      {
        period: '2024 — heute',
        role: 'Technischer Berater',
        org: 'PSM Austria',
        note: 'Technologiestrategie und Architektur für einen etablierten österreichischen Sicherheitsdienstleister, einschließlich Incident Response.',
      },
      {
        period: '2022 — 2025',
        role: 'Software Engineering Lead → Backend Lead',
        org: 'nu. education — Zürich',
        note: 'In dreieinhalb Jahren vom Entwickler zum Lead; berufliche Bildung der nächsten Generation auf Spring Boot und Kubernetes.',
      },
      {
        period: '2022 — 2023',
        role: 'Software-Berater & Entwickler',
        org: 'CLEO AG — Zürich',
        note: 'Beratung und Umsetzung von Systemen auf Spring Boot und Spring MVC.',
      },
      {
        period: '2018 — 2020',
        role: 'Mitgründer',
        org: 'Advertilio GmbH — Wien',
        note: 'Deep-Tech-Startup, das mit Computer Vision und ML Erscheinungsbild und Körpersprache in Echtzeit für DOOH auswertete. Verkauft.',
      },
    ],
    education: [
      {
        period: '2025 — 2026',
        degree: 'MSc Informatik',
        org: 'Universität St.Gallen (HSG)',
        note: 'Abgebrochen, um mich auf die eigenen Unternehmen zu konzentrieren.',
      },
      {
        period: '2021 — 2024',
        degree: 'BSc Technische Mathematik · Nebenfach Informatik',
        org: 'TU Wien',
        note: 'Softwarequalitätssicherung, JUnit und die mathematischen Grundlagen hinter den Systemen, die ich baue.',
      },
      {
        period: '2019 — 2023',
        degree: 'BA Betriebswirtschaft · Wirtschaftsinformatik',
        org: 'Universität St.Gallen (HSG)',
        note: 'Abschlussarbeit: „Investigation of Software Architectures for Smart Manufacturing Systems“ (Prof. Dr. Ronny Seiger).',
      },
    ],
    caption: 'Gründer & CTO',
  },
}
