/* Icon names resolved against @lucide/astro at render time — keeping these as
   strings means the data layer carries no framework dependency. */
export type IconName =
  | 'Boxes'
  | 'Compass'
  | 'Gauge'
  | 'Rocket'
  | 'Server'
  | 'Smartphone'

export interface Service {
  ref: string
  title: string
  summary: string
  detail: string
  icon: IconName
}

export const services: Service[] = [
  {
    ref: 'S-01',
    title: 'Fractional CTO & architecture',
    summary: 'Own the technical direction, not just the code.',
    detail:
      'From zero-to-one product architecture to team and hiring decisions. I set the technical direction for early-stage companies and stay accountable for shipping it — as a founder does, not a contractor passing through.',
    icon: 'Boxes',
  },
  {
    ref: 'S-02',
    title: 'Backend & platform engineering',
    summary: 'Systems that stay correct under real load.',
    detail:
      'Domain modelling, APIs, real-time location and scheduling, and data pipelines built for the failure modes. TypeScript, Node, Postgres, and event-driven services — GDPR-aware and EU-hosted when it matters.',
    icon: 'Server',
  },
  {
    ref: 'S-03',
    title: 'Mobile apps — React Native',
    summary: 'One codebase, iOS and Android, shipped fast.',
    detail:
      'Cross-platform mobile apps with React Native and Expo — real-time location, offline-first data, push, and native integrations. It’s how OnDuty’s field app and BookSecurity’s marketplace both ship to both stores from a single team.',
    icon: 'Smartphone',
  },
  {
    ref: 'S-04',
    title: 'Reliability & performance',
    summary: 'Find the bottleneck, remove it, prove it.',
    detail:
      'Profiling, query tuning, caching, and observability you can defend. I instrument first, then cut latency and cost where the data — not the guesswork — says it matters.',
    icon: 'Gauge',
  },
  {
    ref: 'S-05',
    title: 'Delivery & DevOps',
    summary: 'From laptop to production, repeatably.',
    detail:
      'CI/CD, infrastructure-as-code, containers, and release processes that let small teams ship daily without fear. Boring, documented, and hard to break.',
    icon: 'Rocket',
  },
  {
    ref: 'S-06',
    title: 'Technical advisory',
    summary: 'A second pair of senior eyes.',
    detail:
      'Architecture reviews, build-vs-buy calls, security and compliance posture, and roadmap sanity checks. Embedded part-time or by the engagement — direct, with the trade-offs on the table.',
    icon: 'Compass',
  },
]

export interface Project {
  slug: string
  ref: string
  name: string
  url: string
  role: string
  period: string
  status: 'Building' | 'Live' | 'Advisory' | 'Past'
  domain: string
  tagline: string
  summary: string
  problem: string
  work: string
  outcome: string
  stack: string[]
}

export const projects: Project[] = [
  {
    slug: 'onduty',
    ref: 'P-01',
    name: 'OnDuty',
    url: 'https://www.onduty.tech/',
    role: 'Co-Founder & CTO',
    period: 'Jan 2026 — now',
    status: 'Building',
    domain: 'Security & field-ops SaaS',
    tagline: 'The digital backbone for modern field teams.',
    summary:
      'A cloud platform that folds scheduling, guard control, time tracking, and billing into one operating system for security and field-service companies.',
    problem:
      'Security firms run on spreadsheets, WhatsApp, and paper handovers. Shifts, GPS check-ins, working-time law (AZG), and invoicing all live in different places and never reconcile.',
    work:
      'I architect and lead the development end to end: real-time location and GPS-verified check-ins, an AI-assisted scheduling engine, working-time and collective-agreement logic computed on read, and a billing pipeline — all GDPR-compliant and EU-hosted in Vienna.',
    outcome:
      'One system from roster to invoice, so operators run their teams in real time instead of reconstructing the day after it happened.',
    stack: ['TypeScript', 'Node.js', 'React', 'Postgres', 'React Native', 'AWS'],
  },
  {
    slug: 'nisura',
    ref: 'P-02',
    name: 'Nisura',
    url: 'https://nisura.eu/',
    role: 'Founder & CTO',
    period: 'Jun 2026 — now',
    status: 'Building',
    domain: 'Cyber Risk Quantification',
    tagline: 'Translate your attack surface into euros.',
    summary:
      'The European CRQ engine that turns an organisation’s external attack surface into projected financial exposure — and maps its statutory NIS2 liability.',
    problem:
      'Security teams drown in CVSS scores and red dashboards that never answer the two questions leadership actually asks: what will this cost us, and where are we legally exposed under NIS2?',
    work:
      'I built the engine that discovers the external attack surface, pulls live threat intelligence (KEV, EPSS, NVD) and passive scan signals — never hardcoded — and maps them onto a financial-exposure and NIS2-liability model, with a native phishing-simulation product behind proper legal gating.',
    outcome:
      'A leading-niche EU position on CRQ: exposure expressed in money and statutory liability, with every number cited back to a live source.',
    stack: ['TypeScript', 'Node.js', 'Postgres', 'Python', 'Threat Intel APIs'],
  },
  {
    slug: 'booksecurity',
    ref: 'P-03',
    name: 'BookSecurity',
    url: 'https://www.booksecurity.ae/',
    role: 'Lead Developer & Architect',
    period: '2026 — now',
    status: 'Live',
    domain: 'On-demand security marketplace',
    tagline: 'Professional protection, booked in 60 seconds.',
    summary:
      'A mobile marketplace connecting people and event organisers in Dubai and Abu Dhabi with SIRA-licensed security guards, on demand and contract-free.',
    problem:
      'Booking a vetted, licensed guard meant phone calls, contracts, and days of waiting — with no way to match supply to a booking in real time.',
    work:
      'I lead the architecture: a two-sided booking marketplace with licensing and verification workflows, real-time guard matching and dispatch, payments, and a mobile app for both sides.',
    outcome:
      'On-demand protection you can book from a phone in under a minute, with every guard SIRA-verified.',
    stack: ['React Native', 'TypeScript', 'Node.js', 'Postgres', 'Stripe'],
  },
  {
    slug: 'yukbul',
    ref: 'P-04',
    name: 'Yükbul',
    url: 'https://yukbul.tr/',
    role: 'Lead Developer & Architect',
    period: '2026 — now',
    status: 'Live',
    domain: 'Logistics / freight-matching',
    tagline: 'Stop searching for cargo. Let cargo find you.',
    summary:
      'A freight-matching platform for Turkish truck drivers that works entirely inside WhatsApp, auto-matching cargo listings to drivers by route and vehicle type.',
    problem:
      'Drivers monitor dozens of noisy WhatsApp cargo groups by hand, scrolling for loads that fit their route — and miss most of them.',
    work:
      'I architected the matching engine that parses unstructured group messages, extracts route and vehicle constraints, and pushes only relevant loads back to each driver — meeting them where they already work, in chat.',
    outcome:
      'Drivers stop scrolling and start getting matched loads delivered to them, with zero new app to learn.',
    stack: ['TypeScript', 'Node.js', 'WhatsApp API', 'Postgres', 'NLP'],
  },
  {
    slug: 'psm-austria',
    ref: 'P-05',
    name: 'PSM Austria',
    url: 'https://psm-austria.at/',
    role: 'Technical Advisor',
    period: '2026 — now',
    status: 'Advisory',
    domain: 'Physical security services',
    tagline: 'Your partner for professional security.',
    summary:
      'One of Austria’s established security firms — 800+ licensed experts across event, facility, and personnel protection — modernising how its operations run.',
    problem:
      'A large, field-heavy operation carrying years of process debt needed a credible path from manual coordination to digital, real-time operations.',
    work:
      'I advise on technology strategy and architecture: where to digitise, what to build versus buy, and how to bring field operations onto modern, compliant tooling without disrupting live deployments.',
    outcome:
      'A pragmatic roadmap that turns an experienced physical-security operator into a digitally-run one, step by step.',
    stack: ['Advisory', 'Architecture', 'Build-vs-buy', 'Compliance'],
  },
  {
    slug: 'easyprep',
    ref: 'P-06',
    name: 'EasyPrep',
    url: 'https://easyprep.ch/en/about',
    role: 'Technical Advisor',
    period: '2026 — now',
    status: 'Advisory',
    domain: 'EdTech / exam preparation',
    tagline: 'A preparation platform for the exams that matter.',
    summary:
      'A Swiss online preparation platform that helps students study and rehearse for high-stakes exams with structured practice and feedback.',
    problem:
      'Exam prep is fragmented across PDFs, old question banks, and guesswork, with little signal on whether a student is actually ready.',
    work:
      'I advise on platform architecture and the technical roadmap — how to scale content and practice engines reliably, and where engineering effort earns the most learning outcome per franc.',
    outcome:
      'A clearer technical direction for a learning product that has to be both dependable at exam time and cheap to grow.',
    stack: ['Advisory', 'Architecture', 'Scaling', 'EdTech'],
  },
  {
    slug: 'nu-education',
    ref: 'P-07',
    name: 'nu. education',
    url: 'https://nu.education/',
    role: 'Software Engineering & Backend Lead',
    period: '2022 — 2025',
    status: 'Past',
    domain: 'EdTech · vocational learning',
    tagline: 'Next-generation vocational learning.',
    summary:
      'A next-generation vocational-learning platform in Zurich, where I grew from engineer to lead over 3.5 years and owned the backend and delivery.',
    problem:
      'A fast-growing learning product needed a backend and delivery pipeline that could scale reliably while the team kept shipping features.',
    work:
      'I led backend engineering and delivery: Spring Boot services on Kubernetes, CI/CD, observability, and the reliability practices that let the team ship continuously — and I mentored the engineers around me.',
    outcome:
      'A dependable backend and delivery pipeline that scaled with the product. I moved from Software Engineer to Backend Lead and then Software Engineering Lead.',
    stack: ['Java', 'Spring Boot', 'Kubernetes', 'Docker', 'Postgres', 'AWS'],
  },
]

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Patrick Schweizer',
    role: 'Head of Product · nu.Education',
    quote:
      'One of the most reliable and dedicated engineers I’ve ever worked with. If something breaks at 2am, Boris is the one you can call — and you know it will get fixed. No drama, no excuses, just ownership and results. A true team player who naturally mentors others and raises the quality of the whole team.',
  },
  {
    name: 'Angelos Zaimis',
    role: 'Software Engineer · nu.Education',
    quote:
      'For more than three years he consistently stood out as both a highly skilled engineer and a strong technical leader. As Tech Lead, he was the person the team turned to when things needed immediate attention — composed under pressure, and fully accountable for resolving problems properly.',
  },
  {
    name: 'Robert Mejlerö',
    role: 'CTO · was Boris’s manager at CLEO AG',
    quote:
      'I’m pleased to recommend Boris for any DevOps role. He quickly developed a strong command of Kubernetes, cloud migration, and service orchestration — and applies DevOps principles and techniques effectively.',
  },
  {
    name: 'Amin El Abida',
    role: 'Senior Test Automation Engineer',
    quote:
      'A remarkable engineer whose agility and adeptness at mastering new technologies stand out strikingly. In a high-pressure environment, his capacity to remain unflappable and maintain focus is commendable — consistently delivering solutions that are innovative and efficient.',
  },
]

export interface Stat {
  value: string
  label: string
}

export const stats: Stat[] = [
  { value: '2018', label: 'founding companies since' },
  { value: '3', label: 'startups co-founded · 1 exit' },
  { value: '6', label: 'products led across EU, UAE & TR' },
  { value: 'CET', label: 'Vienna & St. Gallen · remote-first' },
]

export const stack = [
  'TypeScript',
  'Node.js',
  'React',
  'React Native',
  'Java',
  'Spring Boot',
  'Kubernetes',
  'Docker',
  'Postgres',
  'Python',
  'AWS',
  'GDPR / EU-hosting',
]
