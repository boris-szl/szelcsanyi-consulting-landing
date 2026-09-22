import { ui, type UI } from '@/i18n/ui'

export const LOCALES = ['en', 'de'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_NAME: Record<Locale, string> = { en: 'English', de: 'Deutsch' }
/** Shown in the switcher — short enough for the header at any width. */
export const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', de: 'DE' }
export const OG_LOCALE: Record<Locale, string> = { en: 'en', de: 'de_DE' }

export function t(lang: Locale): UI {
  return ui[lang]
}

/** Which locale a pathname belongs to. */
export function localeOf(pathname: string): Locale {
  return pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en'
}

/**
 * The same page in another locale. English keeps the bare path so existing
 * URLs are untouched; German gets the /de prefix.
 */
export function localizePath(path: string, lang: Locale): string {
  const bare = path.replace(/^\/de(?=\/|$)/, '') || '/'
  if (lang === 'en') return bare
  return bare === '/' ? '/de' : `/de${bare}`
}

/** Both locale variants of a path, for hreflang. */
export function alternatesFor(path: string): { lang: Locale; path: string }[] {
  return LOCALES.map((lang) => ({ lang, path: localizePath(path, lang) }))
}

/**
 * The `params` entries a page needs so one file serves both locales.
 * `undefined` yields the bare path (English); 'de' yields the /de prefix.
 */
export function localePaths(): { params: { lang: string | undefined } }[] {
  return [{ params: { lang: undefined } }, { params: { lang: 'de' } }]
}

/** Read the locale out of a rest-param route. */
export function langParam(param: string | undefined): Locale {
  return param === 'de' ? 'de' : 'en'
}
