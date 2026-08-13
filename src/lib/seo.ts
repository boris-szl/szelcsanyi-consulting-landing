import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { config } from '@/config'

interface Seo {
  title: string
  description?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Update document title + meta per route. Keeps the static index.html values as
 * the non-JS fallback; this refines them for JS-capable crawlers and browsers.
 */
export function useSeo({ title, description }: Seo) {
  const { pathname } = useLocation()
  const fullTitle =
    pathname === '/' ? title : `${title} — ${config.brandFull}`
  const desc = description ?? config.seo.description
  const url = `${config.seo.siteUrl}${pathname}`

  useEffect(() => {
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setLink('canonical', url)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)
  }, [fullTitle, desc, url])
}
