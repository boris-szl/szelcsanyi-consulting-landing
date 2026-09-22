/*
  Locale-aware views over the English source data.

  The English objects in lib/content.ts and lib/roles.ts stay canonical;
  these merge the German copy from src/i18n over them. Anything without a
  translation falls back to English rather than rendering blank — a missing
  string should degrade, not break the page.
*/
import { projects, services, stats, testimonials, type Project, type Service } from '@/lib/content'
import { roles, type Role } from '@/lib/roles'
import { projectsDe, servicesDe, statsDe, testimonialRolesDe } from '@/i18n/content.de'
import { rolesDe } from '@/i18n/roles.de'
import type { Locale } from '@/i18n'

/*
  `status` stays the English union value because the badge styling switches on
  it; the translated text rides alongside as `statusLabel`. Translating the
  value itself would mean styling on a localised string.
*/
export type LocalizedProject = Project & { statusLabel: string }
export type LocalizedRole = Role & { statusLabel: string }

export function localizedProjects(lang: Locale): LocalizedProject[] {
  return projects.map((project) => {
    const de = lang === 'de' ? projectsDe[project.slug] : undefined
    return {
      ...project,
      ...(de ? { ...de, status: project.status } : {}),
      statusLabel: de?.status ?? project.status,
    }
  })
}

export function localizedRoles(lang: Locale): LocalizedRole[] {
  return roles.map((role) => {
    const de = lang === 'de' ? rolesDe[role.slug] : undefined
    return {
      ...role,
      ...(de ? { ...de, status: role.status } : {}),
      statusLabel: de?.status ?? role.status,
    }
  })
}

export function localizedServices(lang: Locale): Service[] {
  if (lang === 'en') return [...services]
  return services.map((service) => ({ ...service, ...(servicesDe[service.ref] ?? {}) }))
}

export function localizedStats(lang: Locale) {
  if (lang === 'en') return [...stats]
  return stats.map((stat) => ({ ...stat, label: statsDe[stat.label] ?? stat.label }))
}

export function localizedTestimonials(lang: Locale) {
  if (lang === 'en') return [...testimonials]
  return testimonials.map((item) => ({
    ...item,
    role: testimonialRolesDe[item.role] ?? item.role,
  }))
}
