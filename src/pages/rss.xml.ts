import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { config } from '@/config'

/*
  Full-text RSS. Feed readers, aggregators, and several AI crawlers treat a
  feed as the cheapest way to discover and ingest writing, so the whole post
  body goes in rather than an excerpt.
*/
export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  )

  return rss({
    title: `Writing — ${config.brandFull}`,
    description:
      'Field notes on building dependable systems, reading slow queries, and doing consulting that leaves a team stronger.',
    site: context.site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      author: `${config.email} (${config.owner})`,
      content: post.body,
    })),
    customData: `<language>en</language><copyright>© ${new Date().getFullYear()} ${config.owner}</copyright>`,
  })
}
