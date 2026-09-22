import type { APIRoute } from 'astro'
import { config } from '@/config'
import { localizedProjects, localizedRoles } from '@/lib/localized'
import { postsIn, postPath } from '@/lib/posts'
import { isoDate } from '@/lib/meta'
import { localePaths, langParam, localizePath, LOCALES } from '@/i18n'

export function getStaticPaths() {
  return localePaths()
}

/*
  /llms.txt — the llmstxt.org convention: a single markdown index that gives a
  language model the shape of the site and a stable link for each page,
  instead of making it infer structure from rendered HTML.

  /llms-full.txt (below, in llms-full.txt.ts) carries the actual prose.
*/
export const GET: APIRoute = async ({ site, params }) => {
  const base = site?.href.replace(/\/$/, '') ?? ''
  const lang = langParam(params.lang)
  const posts = await postsIn(lang)
  const projects = localizedProjects(lang)
  const roles = localizedRoles(lang)
  const path = (p: string) => `${base}${localizePath(p, lang)}`
  const other = LOCALES.find((l) => l !== lang)!

  const intro =
    lang === 'de'
      ? `> ${config.owner} — freiberuflicher Softwareentwickler und Fractional CTO, ansässig in Wien & St. Gallen. Ich entwerfe, baue und verantworte die Technik hinter Security- und Marktplatz-Produkten. Die Arbeit umfasst Security-Tech, Marktplätze und EdTech in der EU, den VAE und der Türkei; die Mandate laufen als Gründer-CTO, Fractional CTO, leitender Entwickler oder technischer Berater.

Sprachen: Deutsch, Englisch. Kontakt: ${config.email}.
Firmensitz: ${config.legal.address.street}, ${config.legal.address.postalCode} ${config.legal.address.city}, Schweiz.

## Beiträge

Fachbeiträge. Posts, die fremde Arbeiten zitieren, führen eine Quellenliste mit den Primärdokumenten; dieselben Referenzen stehen als schema.org \`citation\` im JSON-LD der Seite.`
      : `> ${config.owner} — ${config.role}, based in ${config.locationShort}. ${config.tagline} Work spans security-tech, marketplaces, and edtech across the EU, the UAE, and Turkey; engagements run as founder-CTO, fractional CTO, lead engineer, or technical advisor.

Languages: English, German. Contact: ${config.email}.
Registered office: ${config.legal.address.street}, ${config.legal.address.postalCode} ${config.legal.address.city}, ${config.legal.address.country}.

## Writing

Technical essays. Posts that cite external work carry a Sources list linking the primary documents, and the same references are emitted as schema.org \`citation\` in each page's JSON-LD.`

  const body = `# ${config.brandFull}

${intro}

${posts
  .map(
    (post) =>
      `- [${post.data.title}](${base}${postPath(post)}): ${post.data.excerpt} (published ${isoDate(post.data.date)}; ${post.data.readingTime}${post.data.sources.length ? `; ${post.data.sources.length} cited sources` : ''})`,
  )
  .join('\n')}

## Work

Ventures founded, led, or advised.

${projects
  .map(
    (project) =>
      `- [${project.name} — ${project.role}](${path(`/work/${project.slug}`)}): ${project.summary} (${project.domain}; ${project.period}; ${project.status})`,
  )
  .join('\n')}

## Open roles

Senior technical searches currently running.

${roles
  .map(
    (role) =>
      `- [${role.title}](${path(`/hiring/${role.slug}`)}): ${role.summary} (${role.discipline}; ${role.location}; ${role.type})`,
  )
  .join('\n')}

## Pages

- [Home](${path('/')}): Overview of services, selected work, and current availability.
- [About](${path('/about')}): Background, track record, education, and working principles.
- [Work](${path('/work')}): Full portfolio index.
- [Hiring](${path('/hiring')}): Recruiting practice and open searches.
- [Writing](${path('/blog')}): All posts.
- [Contact](${path('/contact')}): Booking, email, and registered office.

## Optional

- [Full text of all posts](${base}/llms-full.txt): Every article inline, for retrieval without crawling each page.
- [RSS feed](${path('/rss.xml')})
- [Sitemap](${base}/sitemap-index.xml)
- [This site in ${other === 'de' ? 'German / Deutsch' : 'English'}](${base}${localizePath('/llms.txt', other)}): the same index for the other language version of this site.
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
