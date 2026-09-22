import { getCollection, type CollectionEntry } from 'astro:content'
import type { Locale } from '@/i18n'

export type Post = CollectionEntry<'blog'>

/*
  A German post's file is named "<slug>-de.md" so it sorts next to its
  original, but its URL should not carry that suffix — the /de prefix already
  says what language it is. /de/blog/wordpress-zero-day-post-mortem reads
  better than /de/blog/wordpress-zero-day-post-mortem-de and pairs cleanly
  with the English URL for hreflang.
*/
export function postSlug(post: Post): string {
  return post.data.lang === 'en' ? post.id : post.id.replace(/-de$/, '')
}

export function postPath(post: Post): string {
  const slug = postSlug(post)
  return post.data.lang === 'en' ? `/blog/${slug}` : `/de/blog/${slug}`
}

/** Published posts in one locale, newest first. */
export async function postsIn(lang: Locale): Promise<Post[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft && data.lang === lang)
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
