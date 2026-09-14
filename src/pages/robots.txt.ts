import type { APIRoute } from 'astro'

/*
  robots.txt, generated so the sitemap URL always tracks the configured site.

  AI crawlers are allowed deliberately: the point of the structured data and
  the Sources lists is to be quotable by answer engines, which only works if
  they are permitted to read the pages. Remove a user-agent here to opt out of
  that specific engine.
*/
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — training
  'OAI-SearchBot', // OpenAI — ChatGPT search index
  'ChatGPT-User', // OpenAI — user-initiated fetch
  'ClaudeBot', // Anthropic — training
  'Claude-User', // Anthropic — user-initiated fetch
  'Claude-SearchBot', // Anthropic — search index
  'PerplexityBot', // Perplexity — index
  'Perplexity-User', // Perplexity — user-initiated fetch
  'Google-Extended', // Google — Gemini / AI Overviews grounding
  'Applebot-Extended', // Apple Intelligence
  'CCBot', // Common Crawl
  'meta-externalagent', // Meta AI
  'Bingbot',
  'DuckDuckBot',
]

export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? ''

  const body = [
    '# Everyone may read everything.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Named AI and search crawlers — allowed explicitly so the structured',
    '# data and cited sources on this site are usable in answer engines.',
    ...AI_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${base}/sitemap-index.xml`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
