import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { StatusBadge } from '@/components/StatusBadge'
import { site } from '@/lib/site'
import { useSeo } from '@/lib/seo'
import { formattedAddress } from '@/config'

const inputClass =
  'w-full rounded-[var(--radius-card)] border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus-visible:outline-none'

export function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Start a project with Boris Szelcsányi — fractional CTO, backend, and React Native mobile. Based in Vienna & St. Gallen, working remote-first.',
  })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const from = String(data.get('email') ?? '')
    const scope = String(data.get('scope') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`New project enquiry — ${name || 'website'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${from}\nEngagement: ${scope}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrowRef="§ CONTACT"
        eyebrow="Contact"
        title="Tell me what you’re building."
        intro="The more concrete, the better — what it is, where it hurts, and roughly when. I reply within a day with an honest read on whether I can help."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="mono-label">Name</span>
                  <input name="name" required className={inputClass} placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="mono-label">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="mono-label">Engagement type</span>
                <select name="scope" className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select one…
                  </option>
                  <option>Fractional CTO</option>
                  <option>Project / build</option>
                  <option>Architecture review</option>
                  <option>Technical advisory</option>
                  <option>Something else</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono-label">What you’re building</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className={inputClass}
                  placeholder="A few sentences on the product, the problem, and the timeline."
                />
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">
                  Send enquiry
                </Button>
                {sent && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                    <Check className="size-4 text-accent" /> Opening your email client…
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">
                This opens a pre-filled email — nothing is sent until you hit send. Prefer to
                write directly? Use the address on the right.
              </p>
            </form>
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
