import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/*
  Blog posts. The schema is the contract: a malformed date or a source missing
  its URL fails the build rather than shipping a broken citation.
*/
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Post language. Drives <html lang>, og:locale, and schema inLanguage. */
    lang: z.enum(['en', 'de']).default('en'),
    /*
      Shared id across translations of the same post. Posts sharing a key are
      emitted as hreflang alternates of one another, which is what stops two
      language versions of the same article competing in search.
    */
    translationKey: z.string().optional(),
    /** Set when a post is revised; drives `dateModified` in the JSON-LD. */
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    tags: z
      .string()
      .transform((s) => s.split(',').map((t) => t.trim()).filter(Boolean)),
    readingTime: z.string(),
    /** Whether the post is a first-hand account — surfaced in the byline. */
    firstHand: z.boolean().default(false),
    /*
      Primary references the post leans on. Rendered as a Sources list and
      emitted as schema.org `citation`, so an answer engine can trace a claim
      back to the document it came from.
    */
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.url(),
          publisher: z.string().optional(),
          /** Optional note on what this source backs up. */
          note: z.string().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
