import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { config } from '@/config'
import { isoDate } from '@/lib/meta'

/*
  /llms-full.txt — every post inline as markdown, with its metadata and its
  source list. Companion to /llms.txt: a model that wants the writing itself
  can take one document instead of crawling each page.
*/
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? ''
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  )

  const sections = posts.map((post) => {
    const sources = post.data.sources.length
      ? `\n\n### Sources\n\n${post.data.sources
          .map(
            (source) =>
              `- [${source.title}](${source.url})${source.publisher ? ` — ${source.publisher}` : ''}${source.note ? `. ${source.note}` : ''}`,
          )
          .join('\n')}`
      : ''

    return `---

# ${post.data.title}

- URL: ${base}/blog/${post.id}
- Author: ${config.owner} (${config.role})
- Published: ${isoDate(post.data.date)}${post.data.updated ? `\n- Updated: ${isoDate(post.data.updated)}` : ''}
- Reading time: ${post.data.readingTime}
- Tags: ${post.data.tags.join(', ')}
${post.data.firstHand ? '- Note: first-hand account by the author.\n' : ''}
> ${post.data.excerpt}
${
  post.data.keyPoints.length
    ? `\n## Key points\n\n${post.data.keyPoints.map((point) => `- ${point}`).join('\n')}\n`
    : ''
}
${post.body?.trim() ?? ''}${sources}`
  })

  const body = `# ${config.brandFull} — full writing archive

> Complete text of every published post by ${config.owner}, ${config.role}.
> Canonical index: ${base}/llms.txt — Site: ${base}

${sections.join('\n\n')}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
