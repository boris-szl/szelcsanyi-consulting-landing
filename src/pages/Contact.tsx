import { ArrowUpRight } from 'lucide-react'
import { BookingEmbed } from '@/components/BookingEmbed'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { StatusBadge } from '@/components/StatusBadge'
import { site } from '@/lib/site'
import { useSeo } from '@/lib/seo'
import { formattedAddress } from '@/config'

export function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with Boris Szelcsányi — fractional CTO, backend, and React Native mobile. Based in Vienna & St. Gallen, working remote-first.',
  })
  return (
    <>
      <PageHeader
        eyebrowRef="§ CONTACT"
        eyebrow="Contact"
        title="Book a call."
        intro="Grab a slot that suits you — 30 minutes, no pitch. Come with what you’re building, where it hurts, and roughly when. You’ll leave with an honest read on whether I can help."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <BookingEmbed />
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface">
              <div className="border-b border-line px-6 py-4">
                <StatusBadge />
              </div>
              <dl className="divide-y divide-line">
                <div className="px-6 py-4">
                  <dt className="mono-label">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={site.social.email}
                      className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="mono-label">Based in</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {site.location} · {site.timezone}
                  </dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="mono-label">Registered office</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {formattedAddress}
                  </dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="mono-label">Working style</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    Remote-first, across EU / UAE / TR
                  </dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="mono-label">Elsewhere</dt>
                  <dd className="mt-2 flex flex-col gap-2">
                    <a
                      href={site.social.linkedin}
                      className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
                    >
                      LinkedIn <ArrowUpRight className="size-3.5" />
                    </a>
                    <a
                      href={site.social.github}
                      className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
                    >
                      GitHub <ArrowUpRight className="size-3.5" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
