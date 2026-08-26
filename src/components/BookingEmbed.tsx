import { Suspense, lazy } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'

/*
  Cal.com booker.

  <BookerEmbed /> talks to the Cal.com Platform API, so it only works inside a
  <CalProvider> holding a Platform OAuth client id. That id is build-time config
  (VITE_CAL_CLIENT_ID) — when it is missing we render a plain link to the public
  cal.com page instead of an embed that would sit there spinning forever.

  The atoms bundle is large (~300 KB of scoped CSS on top of the JS), so it is
  code-split: nothing ships to visitors who never open /contact.
*/

const { username, eventSlug, view, clientId, apiUrl } = site.cal

const publicCalUrl = `https://cal.com/${username}/${eventSlug}`

const CalBooker = lazy(async () => {
  const [{ CalProvider, BookerEmbed }] = await Promise.all([
    import('@calcom/atoms'),
    import('@calcom/atoms/globals.min.css'),
  ])

  return {
    default: () => (
      <CalProvider clientId={clientId} options={{ apiUrl }} isEmbed>
        <BookerEmbed
          username={username}
          eventSlug={eventSlug}
          view={view}
          customClassNames={{
            bookerContainer: 'border-line border rounded-[var(--radius-card)]',
          }}
          onCreateBookingSuccess={() => {
            console.log('booking created successfully')
          }}
        />
      </CalProvider>
    ),
  }
})

function BookerFallback({ note }: { note: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface px-6 py-8">
      <p className="text-sm leading-relaxed text-muted">{note}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={publicCalUrl} target="_blank" rel="noreferrer">
          <Button size="lg">
            Open my calendar <ArrowUpRight className="size-4" />
          </Button>
        </a>
        <a href={site.social.email}>
          <Button variant="outline" size="lg">
            {site.email}
          </Button>
        </a>
      </div>
    </div>
  )
}

export function BookingEmbed() {
  if (!clientId) {
    return (
      <BookerFallback note="Pick a slot that suits you — the booking page opens in a new tab. Prefer email? That works just as well." />
    )
  }

  return (
    <Suspense
      fallback={
        <div
          className="h-[560px] animate-pulse rounded-[var(--radius-card)] border border-line bg-surface"
          aria-label="Loading calendar"
        />
      }
    >
      <CalBooker />
    </Suspense>
  )
}
