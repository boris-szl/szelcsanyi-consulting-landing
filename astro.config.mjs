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


/*
  Tag archives with a single post are emitted noindex (see src/lib/tags.ts).
  Listing a noindex URL in the sitemap is a contradictory signal, so compute
  which tags are thin and drop those from the sitemap here.
*/
/*
  Sitemap facts read straight from the markdown frontmatter. The sitemap
  integration discovers routes on its own but cannot see collection data, and
  both of these are per-locale: a German post has its own date key, and German
  tag archives are counted separately because the tag names differ.
*/
const POST_FRONTMATTER = readdirSync(BLOG_DIR)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const raw = readFileSync(new URL(`./src/content/blog/${file}`, import.meta.url), 'utf8')
    const front = /^---\n([\s\S]*?)\n---/.exec(raw)?.[1] ?? ''
    return {
      stem: file.replace(/\.md$/, ''),
      draft: /^draft:\s*true/m.test(front),
      lang: /^lang:\s*(\w+)/m.exec(front)?.[1] ?? 'en',
      date:
        /^updated:\s*(\d{4}-\d{2}-\d{2})/m.exec(front)?.[1] ??
        /^date:\s*(\d{4}-\d{2}-\d{2})/m.exec(front)?.[1],
      tags: (/^tags:\s*(.*)$/m.exec(front)?.[1] ?? '')
        .split(',')
        .map((tag) => tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
        .filter(Boolean),
    }
  })
  .filter((post) => !post.draft && post.date)

/* Keyed by file stem — a German post is "<slug>-de". */
const POST_DATES = Object.fromEntries(POST_FRONTMATTER.map((post) => [post.stem, post.date]))

/* Tag archives with a single post are emitted noindex (see src/lib/tags.ts),
   and listing a noindex URL in the sitemap is a contradictory signal. */
const INDEXABLE_TAG_SLUGS = (() => {
  /** @type {Record<string, Map<string, number>>} */
  const byLocale = { en: new Map(), de: new Map() }
  for (const post of POST_FRONTMATTER) {
    const counts = byLocale[post.lang]
    if (!counts) continue
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return Object.fromEntries(
    Object.entries(byLocale).map(([locale, counts]) => [
      locale,
      new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([slug]) => slug)),
    ]),
  )
})()

export default defineConfig({
  // Absolute URLs for canonicals, Open Graph, the sitemap, and the RSS feed
  // all derive from this.
  site: 'https://szelcsanyi.net',

  /*
    English lives at the root and German under /de. `prefixDefaultLocale:
    false` keeps every existing English URL exactly where it was — this was
    retrofitted onto a live site, and moving /about to /en/about would have
    thrown away its history for nothing.
  */
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
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

  /*
    The German post used to live at /blog/<slug>-de, before /de existed. It
    moved to /de/blog/<slug> for symmetry with the English URL; this keeps the
    published link working.
  */
  redirects: {
    '/blog/wordpress-zero-day-post-mortem-de': '/de/blog/wordpress-zero-day-post-mortem',
  },

  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      filter: (page) => {
        const path = new URL(page).pathname
        const slug = /\/blog\/tag\/([^/]+)\/?$/.exec(path)?.[1]
        if (!slug) return true
        const locale = path.startsWith('/de/') ? 'de' : 'en'
        return INDEXABLE_TAG_SLUGS[locale]?.has(slug) ?? false
      },
      serialize(item) {
        const raw = new URL(item.url).pathname.replace(/\/$/, '')
        const locale = raw.startsWith('/de/') || raw === '/de' ? 'de' : 'en'
        /* Compare paths without the locale prefix so both trees rank alike. */
        const path = raw.replace(/^\/de/, '')

        if (path === '') item.priority = 1.0
        else if (/^\/(blog|work|hiring)$/.test(path)) item.priority = 0.8
        else item.priority = 0.6

        /*
          A post's lastmod is the date it was written or revised, not the date
          of the last deploy. Stamping build time on every URL makes lastmod
          meaningless and crawlers learn to ignore it.
        */
        const slug = /^\/blog\/([^/]+)$/.exec(path)?.[1]
        if (slug) {
          const stem = locale === 'de' ? `${slug}-de` : slug
          if (POST_DATES[stem]) item.lastmod = POST_DATES[stem]
        }

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
