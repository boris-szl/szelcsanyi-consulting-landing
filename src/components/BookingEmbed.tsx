import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { site } from '@/lib/site'

/*
  Cal.com inline booking embed.

  This is the iframe embed, not the Platform atoms: the booker is served from
  app.cal.com inside an <iframe>, so our bundle only carries the loader (the
  @calcom/embed-core types are erased at build time — the real embed.js is
  fetched from cal.com on mount). The trade is that we can't style it with our
  own CSS — Cal exposes a fixed set of --cal-* custom properties instead, which
  we map onto the site tokens below so the embed reads as part of the page
  rather than a bolted-on widget.

  Note this pulls a script from app.cal.com; the CSP in security-headers.conf
  allows that origin in script-src / frame-src.
*/

const { calLink, namespace, layout } = site.cal

/* Site tokens (src/index.css) mapped onto Cal's theming contract. */
const calTheme = {
  '--cal-bg': '#101215', // --color-bg
  '--cal-bg-emphasis': '#1c2026', // --color-surface-2
  '--cal-bg-subtle': '#16191d', // --color-surface
  '--cal-bg-muted': '#16191d',
  '--cal-border': '#222b35', // --color-line
  '--cal-border-subtle': '#222b35',
  '--cal-border-emphasis': '#2c3744', // --color-line-strong
  '--cal-text': '#e2e8f0', // --color-ink
  '--cal-text-emphasis': '#e2e8f0',
  '--cal-text-subtle': '#8b95a5', // --color-muted
  '--cal-text-muted': '#8b95a5',
  '--cal-brand': '#2be080', // --color-accent
  '--cal-brand-emphasis': '#33ffa0', // --color-accent-soft
  '--cal-brand-text': '#08130c', // --color-accent-ink
}

export function BookingEmbed() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout,
        cssVarsPerTheme: { dark: calTheme, light: calTheme },
      })
    })()
  }, [])

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      <Cal
        namespace={namespace}
        calLink={calLink}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout, useSlotsViewOnSmallScreen: 'true' }}
      />
    </div>
  )
}
