import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { config } from '@/config'

/*
  A social preview image per post, rendered at build time.

  Before this, all posts shared /og.png, so every share and every AI card
  looked identical. This composes the post's own title over the site's
  palette and emits a real PNG at /blog/<slug>/og.png.

  The font is vendored as TTF rather than pulled from the fontsource package:
  satori cannot read woff2, and a build that downloads a font is a build that
  can fail offline.
*/

/*
  Resolved from the project root, not import.meta.url: this endpoint is
  bundled into dist/.prerender/chunks before it runs, so a path relative to
  the module points somewhere that does not exist.
*/
const FONT = readFileSync(join(process.cwd(), 'src/assets/fonts/Outfit-SemiBold.ttf'))

const COLORS = {
  bg: '#101215',
  surface: '#16191d',
  line: '#222b35',
  ink: '#e2e8f0',
  muted: '#8b95a5',
  accent: '#2be080',
}

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

/** Long titles need to step down a size or they overflow the card. */
function titleSize(title: string): number {
  if (title.length > 78) return 46
  if (title.length > 52) return 54
  return 64
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> }
  const { title, tags, readingTime, lang } = post.data

  /*
    satori's signature asks for a ReactNode, but it consumes this plain object
    tree directly — using it avoids pulling JSX (and React) into a build-time
    endpoint for one image. The cast is the cost of that.
  */
  const element = {
    type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.bg,
          padding: '64px 72px',
          // A thin accent rule down the left edge, echoing the datasheet motif.
          borderLeft: `14px solid ${COLORS.accent}`,
          fontFamily: 'Outfit',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', gap: 14, fontSize: 24 },
              children: [
                { type: 'div', props: { style: { color: COLORS.ink }, children: 'szelcsanyi' } },
                { type: 'div', props: { style: { color: COLORS.accent }, children: 'consulting' } },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: titleSize(title),
                lineHeight: 1.12,
                color: COLORS.ink,
                letterSpacing: '-0.02em',
                // satori has no line clamp; the size step-down above keeps
                // even the longest title inside the card.
                maxWidth: 1000,
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 22,
                color: COLORS.muted,
                borderTop: `1px solid ${COLORS.line}`,
                paddingTop: 26,
              },
              children: [
                { type: 'div', props: { style: { color: COLORS.accent }, children: tags[0] ?? '' } },
                { type: 'div', props: { style: { color: COLORS.line }, children: '/' } },
                { type: 'div', props: { children: readingTime } },
                { type: 'div', props: { style: { color: COLORS.line }, children: '/' } },
                { type: 'div', props: { children: lang === 'de' ? 'Deutsch' : 'English' } },
                {
                  type: 'div',
                  props: {
                    style: { marginLeft: 'auto', color: COLORS.muted },
                    children: config.seo.siteUrl.replace('https://', ''),
                  },
                },
              ],
            },
          },
      ],
    },
  } as unknown as Parameters<typeof satori>[0]

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Outfit', data: FONT, weight: 600, style: 'normal' }],
  })

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
