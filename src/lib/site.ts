/*
  This module is a thin adapter over the central config (src/config.ts).
  Edit your data in src/config.ts — not here.
*/
import { config } from '@/config'

export const site = {
  brand: config.brand,
  brandFull: config.brandFull,
  owner: config.owner,
  role: config.role,
  location: config.locationShort,
  availability: config.availability,
  email: config.email,
  tagline: config.tagline,
  years: config.yearsExperience,
  timezone: config.timezone,
  social: {
    github: config.social.github,
    linkedin: config.social.linkedin,
    email: `mailto:${config.email}`,
  },
}

export { nav } from '@/config'
