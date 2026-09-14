/* ============================================================================
 *  Structured data — the schema.org @graph emitted into every page's <head>.
 *
 *  Pages pass their own primary node (BlogPosting, JobPosting, …); the shared
 *  identity nodes below are appended by <Seo>, so a crawler landing on any
 *  deep link still learns who publishes the site.
 * ========================================================================== */
import { config } from '@/config'

export const SITE = config.seo.siteUrl
export const PERSON_ID = `${SITE}/#person`
export const BUSINESS_ID = `${SITE}/#business`
export const WEBSITE_ID = `${SITE}/#website`

export type Node = Record<string, unknown>

/** Resolve a site-relative path to an absolute URL. */
export function abs(path: string): string {
  return path.startsWith('http') ? path : `${SITE}${path}`
}

/* Placeholder profile URLs must never reach `sameAs` — a dead identity link
   is worse for entity resolution than no link at all. */
const PLACEHOLDER_PROFILES = new Set(['https://www.linkedin.com/', 'https://linkedin.com/'])

export function personNode(): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: config.owner,
    givenName: 'Boris',
    familyName: 'Szelcsányi',
    jobTitle: config.role,
    description: config.tagline,
    url: `${SITE}/about`,
    image: abs('/portrait.png'),
    email: `mailto:${config.email}`,
    knowsLanguage: ['en', 'de'],
    worksFor: { '@id': BUSINESS_ID },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of St.Gallen (HSG)' },
      { '@type': 'CollegeOrUniversity', name: 'TU Wien' },
    ],
    knowsAbout: [
      'Software architecture',
      'Backend engineering',
      'React Native',
      'Mobile app development',
      'Cyber risk quantification',
      'NIS2',
      'PostgreSQL performance',
      'DevOps',
    ],
    sameAs: [config.social.github, config.social.linkedin].filter(
      (url) => url && !PLACEHOLDER_PROFILES.has(url),
    ),
  }
}

export function businessNode(): Node {
  return {
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: config.brandFull,
    legalName: config.legal.entityName,
    description: config.seo.description,
    founder: { '@id': PERSON_ID },
    url: SITE,
    image: abs('/og.png'),
    logo: abs('/logo-szconsult.svg'),
    email: `mailto:${config.email}`,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.legal.address.street,
      postalCode: config.legal.address.postalCode,
      addressLocality: config.legal.address.city,
      addressCountry: 'CH',
    },
    areaServed: [
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'AdministrativeArea', name: 'European Union' },
    ],
    knowsLanguage: ['en', 'de'],
    serviceType: [
      'Fractional CTO',
      'Software architecture',
      'Backend engineering',
      'React Native mobile app development',
      'DevOps',
      'Technical advisory',
    ],
  }
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: config.brandFull,
    inLanguage: 'en',
    publisher: { '@id': BUSINESS_ID },
  }
}

/** Breadcrumbs make the site hierarchy legible to crawlers and to LLMs. */
export function breadcrumbs(trail: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}

/** "8 min read" → "PT8M", a machine-readable duration for schema.org. */
export function isoDuration(readingTime: string): string | undefined {
  const minutes = /(\d+)\s*min/.exec(readingTime)?.[1]
  return minutes ? `PT${minutes}M` : undefined
}

/** yyyy-mm-dd, the form schema.org and Open Graph both accept. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function formatDate(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

/** "example.com" from a full URL — the label shown in a Sources list. */
export function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
