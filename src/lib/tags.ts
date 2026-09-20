import type { CollectionEntry } from 'astro:content'

/*
  Tag helpers shared by the tag archive, the blog index, and the post page.

  Tag pages exist mainly to make the tag badges lead somewhere and to link
  related posts to each other — internal linking was the thinnest part of this
  blog. They are not a bid for traffic on their own, which is why anything
  with a single post is emitted `noindex`: a one-post archive is a thin
  duplicate of the post it links to.
*/

/** Minimum posts before a tag archive is worth indexing. */
export const TAG_INDEX_THRESHOLD = 2

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

type Post = CollectionEntry<'blog'>

/**
 * Tags drawn from English posts only. A German translation carries translated
 * tags ("Forensik" for "Forensics"), and generating an English archive for
 * those produces either an empty page or a near-duplicate of its sibling.
 */
export function collectTags(posts: Post[]): Map<string, Post[]> {
  const byTag = new Map<string, Post[]>()
  for (const post of posts) {
    if (post.data.lang !== 'en') continue
    for (const tag of post.data.tags) {
      const list = byTag.get(tag) ?? []
      list.push(post)
      byTag.set(tag, list)
    }
  }
  for (const list of byTag.values()) {
    list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  }
  return byTag
}

/**
 * Posts sharing the most tags with `post`, strongest overlap first. Used for
 * the "Related" block, which is what actually connects the two incident
 * write-ups to each other.
 */
export function relatedPosts(post: Post, posts: Post[], limit = 3): Post[] {
  const tags = new Set(post.data.tags)
  return posts
    .filter(
      (other) =>
        other.id !== post.id &&
        other.data.lang === post.data.lang &&
        // Never recommend a post's own translation as "related".
        !(other.data.translationKey && other.data.translationKey === post.data.translationKey),
    )
    .map((other) => ({
      post: other,
      shared: other.data.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter((match) => match.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared || b.post.data.date.getTime() - a.post.data.date.getTime(),
    )
    .slice(0, limit)
    .map((match) => match.post)
}
