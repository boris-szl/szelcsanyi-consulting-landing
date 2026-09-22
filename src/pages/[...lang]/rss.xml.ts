import rss from '@astrojs/rss'
import { config } from '@/config'
import { postsIn, postPath } from '@/lib/posts'
import { localePaths, langParam, t } from '@/i18n'

export function getStaticPaths() {
  return localePaths()
}

/*
  Full-text RSS. Feed readers, aggregators, and several AI crawlers treat a
  feed as the cheapest way to discover and ingest writing, so the whole post
  body goes in rather than an excerpt.
*/
export async function GET(context: { site: URL; params: { lang?: string } }) {
  const lang = langParam(context.params.lang)
  const posts = await postsIn(lang)
  const strings = t(lang)

  return rss({
    title: `${strings.nav.blog} — ${config.brandFull}`,
    description: strings.blog.intro,
    site: context.site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
      author: `${config.email} (${config.owner})`,
      content: post.body,
    })),
    customData: `<language>${lang}</language><copyright>© ${new Date().getFullYear()} ${config.owner}</copyright>`,
  })
}
