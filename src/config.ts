/* ============================================================================
 *  szelcsanyi consulting — SITE CONFIG
 *  Single source of truth. Edit YOUR details here; the whole site reads from it.
 * ========================================================================== */

export const config = {
  /* --- Identity ---------------------------------------------------------- */
  brand: 'szelcsanyi', // shown in the two-tone wordmark: "szelcsanyi" + "consulting"
  brandFull: 'szelcsanyi consulting',
  owner: 'Boris Szelcsányi', // your full display name (hero datasheet, footer, alt text)
  role: 'Freelance Software Engineer & Fractional CTO',
  tagline:
    'I design, build, and lead the engineering behind security-tech and marketplace products.',

  /* --- Contact ----------------------------------------------------------- */
  email: 'boris@szelcsanyi.net',
  phone: '', // optional, e.g. '+41 79 000 00 00' — leave '' to hide
  availability: 'Available Q3 · 2 slots', // shown in the status badge

  /* --- Where you work ---------------------------------------------------- */
  locations: ['Vienna, AT', 'St. Gallen, CH'],
  locationShort: 'Vienna & St. Gallen', // compact label used in copy
  timezone: 'CET / UTC+1',
  yearsExperience: 8, // building software (since first company, 2018)

  /* --- Social / profiles (edit the URLs) --------------------------------- */
  social: {
    github: 'https://github.com/boris-szl',
    linkedin: 'https://www.linkedin.com/',
    website: 'https://szelcsanyi.net',
  },

  /* --- Legal / Impressum ------------------------------------------------- */
  legal: {
    entityName: 'Szelcsanyi Consulting', // TODO: confirm exact Handelsregister name
    legalForm: 'Einzelunternehmen', // TODO: confirm (Einzelfirma / GmbH / …)
    address: {
      street: 'Sonnenbergstrasse 35',
      postalCode: '9000',
      city: 'St. Gallen',
      country: 'Switzerland',
    },
    uid: '', // TODO: CHE-xxx.xxx.xxx if you want it shown
    jurisdiction: 'Handelsregister Kanton St. Gallen',
  },

  /* --- SEO / meta -------------------------------------------------------- */
  seo: {
    siteUrl: 'https://szelcsanyi.net',
    title: 'szelcsanyi consulting — Software engineering, shipped',
    description:
      'Boris Szelcsányi — freelance software engineer and fractional CTO. I found and lead the engineering behind security-tech and marketplace products across the EU, UAE, and Turkey.',
  },
} as const

/* Primary navigation ------------------------------------------------------ */
export const nav = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Writing', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const

/* Convenience: a formatted one-line registered address. */
export const formattedAddress = [
  config.legal.address.street,
  `${config.legal.address.postalCode} ${config.legal.address.city}`,
  config.legal.address.country,
].join(', ')
