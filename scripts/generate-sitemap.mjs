// Generates dist/sitemap.xml after the Vite build.
// Reads route slugs from the source so the sitemap stays in sync.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://szelcsanyi.net'
const today = new Date().toISOString().slice(0, 10)

// Static routes
const staticPaths = ['/', '/work', '/about', '/blog', '/contact']

// Project detail routes — scan content.ts for `slug: '...'`
const content = readFileSync(join(root, 'src/lib/content.ts'), 'utf8')
const projectSlugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

// Blog routes — one markdown file per post; pull the date for lastmod
const blogDir = join(root, 'src/content/blog')
const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const raw = readFileSync(join(blogDir, f), 'utf8')
    const date = /date:\s*(\d{4}-\d{2}-\d{2})/.exec(raw)?.[1] ?? today
    return { slug: f.replace(/\.md$/, ''), date }
  })

const urls = [
  ...staticPaths.map((p) => ({ loc: p, lastmod: today })),
  ...projectSlugs.map((s) => ({ loc: `/work/${s}`, lastmod: today })),
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date })),
]

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${BASE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`,
    )
    .join('\n') +
  `\n</urlset>\n`

writeFileSync(join(root, 'dist/sitemap.xml'), xml)
console.log(`sitemap.xml — ${urls.length} URLs`)
