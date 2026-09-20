// @ts-check
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

/*
  Post dates, read straight from the markdown frontmatter — the sitemap
  integration discovers routes on its own but cannot see collection data, and
  `lastmod` is only useful if it reflects the content.
*/
const BLOG_DIR = fileURLToPath(new URL('./src/content/blog', import.meta.url))

const POST_DATES = Object.fromEntries(
  readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(new URL(`./src/content/blog/${file}`, import.meta.url), 'utf8')
      const updated = /^updated:\s*(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1]
      const published = /^date:\s*(\d{4}-\d{2}-\d{2})/m.exec(raw)?.[1]
      return [file.replace(/\.md$/, ''), updated ?? published]
    })
    .filter(([, date]) => date),
)

/*
  Tag archives with a single post are emitted noindex (see src/lib/tags.ts).
  Listing a noindex URL in the sitemap is a contradictory signal, so compute
  which tags are thin and drop those from the sitemap here.
*/
const INDEXABLE_TAG_SLUGS = (() => {
  const counts = new Map()
  for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(new URL(`./src/content/blog/${file}`, import.meta.url), 'utf8')
    const front = /^---\n([\s\S]*?)\n---/.exec(raw)?.[1] ?? ''
    if (/^draft:\s*true/m.test(front)) continue
    // English posts only — German tags get no archive of their own.
    const lang = /^lang:\s*(\w+)/m.exec(front)?.[1] ?? 'en'
    if (lang !== 'en') continue
    for (const tag of (/^tags:\s*(.*)$/m.exec(front)?.[1] ?? '').split(',')) {
      const slug = tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1)
    }
  }
  return new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([slug]) => slug))
})()

export default defineConfig({
  // Absolute URLs for canonicals, Open Graph, the sitemap, and the RSS feed
  // all derive from this.
  site: 'https://szelcsanyi.net',
  trailingSlash: 'never',
  /*
    Directory output (blog/post/index.html) rather than flat .html files: it
    keeps `.html` out of canonical URLs and is what a plain `try_files $uri
    $uri/` nginx rule already resolves.
  */
  build: { format: 'directory' },

  /*
    Astro 7 defaults to 'jsx' whitespace handling, which collapses the space in
    markup like `at <strong>nu. education</strong>`. The copy on this site
    relies on those spaces, and HTML minification is worth nothing next to
    gzip, so keep the output verbatim.
  */
  compressHTML: false,

  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      filter: (page) => {
        const slug = /\/blog\/tag\/([^/]+)\/?$/.exec(page)?.[1]
        return slug ? INDEXABLE_TAG_SLUGS.has(slug) : true
      },
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '')

        if (path === '') item.priority = 1.0
        else if (/^\/(blog|work|hiring)$/.test(path)) item.priority = 0.8
        else item.priority = 0.6

        /*
          A post's lastmod is the date it was written or revised, not the date
          of the last deploy. Stamping build time on every URL makes lastmod
          meaningless and crawlers learn to ignore it.
        */
        const slug = /^\/blog\/(.+)$/.exec(path)?.[1]
        if (slug && POST_DATES[slug]) item.lastmod = POST_DATES[slug]

        return item
      },
    }),
  ],

  /*
    Astro generates a per-page Content-Security-Policy <meta> element, hashing
    every inline script and style it emits (the island bootstrap, the header
    menu, the reveal observer). That is what makes a strict policy possible
    here at all — the previous hand-written CSP forbade inline scripts, which
    would have blocked all of them.

    `frame-ancestors` cannot be set from a <meta> element, so it stays in the
    nginx response header alongside X-Frame-Options.
  */
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        // /contact embeds Cal.com's booker: embed.js loads onto this origin
        // and renders the booking UI in an iframe served from app.cal.com.
        "font-src 'self' https://cal.com",
        "img-src 'self' data: https://cal.com https://app.cal.com",
        "connect-src 'self' https://app.cal.com",
        "frame-src https://app.cal.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", 'https://app.cal.com'],
      },
      styleDirective: {
        // Cal's embed injects a <style> tag we cannot hash ahead of time.
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },

  /*
    Prism, not the default Shiki. Shiki emits inline `style` attributes on
    every token, which two things dislike: the generated CSP (style-src would
    need 'unsafe-inline' purely for code blocks), and this site's own styling
    — inline styles outrank classes, so Shiki's GitHub-dark palette was
    silently overriding the `.prose-datasheet pre` rules in index.css.

    Prism emits classes instead, styled from the site tokens in index.css.
  */
  markdown: { syntaxHighlight: 'prism' },

  vite: { plugins: [tailwindcss()] },
})
