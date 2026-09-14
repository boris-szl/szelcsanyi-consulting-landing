import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { config } from '@/config'
import { projects } from '@/lib/content'
import { roles } from '@/lib/roles'
import { isoDate } from '@/lib/meta'

/*
  /llms.txt — the llmstxt.org convention: a single markdown index that gives a
  language model the shape of the site and a stable link for each page,
  instead of making it infer structure from rendered HTML.

  /llms-full.txt (below, in llms-full.txt.ts) carries the actual prose.
*/
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? ''
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  )

  const body = `# ${config.brandFull}

> ${config.owner} — ${config.role}, based in ${config.locationShort}. ${config.tagline} Work spans security-tech, marketplaces, and edtech across the EU, the UAE, and Turkey; engagements run as founder-CTO, fractional CTO, lead engineer, or technical advisor.

Languages: English, German. Contact: ${config.email}.
Registered office: ${config.legal.address.street}, ${config.legal.address.postalCode} ${config.legal.address.city}, ${config.legal.address.country}.

## Writing

Technical essays. Posts that cite external work carry a Sources list linking the primary documents, and the same references are emitted as schema.org \`citation\` in each page's JSON-LD.

${posts
  .map(
    (post) =>
      `- [${post.data.title}](${base}/blog/${post.id}): ${post.data.excerpt} (published ${isoDate(post.data.date)}; ${post.data.readingTime}${post.data.sources.length ? `; ${post.data.sources.length} cited sources` : ''})`,
  )
  .join('\n')}

## Work

Ventures founded, led, or advised.

${projects
  .map(
    (project) =>
      `- [${project.name} — ${project.role}](${base}/work/${project.slug}): ${project.summary} (${project.domain}; ${project.period}; ${project.status})`,
  )
  .join('\n')}

## Open roles

Senior technical searches currently running.

${roles
  .map(
    (role) =>
      `- [${role.title}](${base}/hiring/${role.slug}): ${role.summary} (${role.discipline}; ${role.location}; ${role.type})`,
  )
  .join('\n')}

## Pages

- [Home](${base}/): Overview of services, selected work, and current availability.
- [About](${base}/about): Background, track record, education, and working principles.
- [Work](${base}/work): Full portfolio index.
- [Hiring](${base}/hiring): Recruiting practice and open searches.
- [Writing](${base}/blog): All posts.
- [Contact](${base}/contact): Booking, email, and registered office.

## Optional

- [Full text of all posts](${base}/llms-full.txt): Every article inline, for retrieval without crawling each page.
- [RSS feed](${base}/rss.xml)
- [Sitemap](${base}/sitemap-index.xml)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
