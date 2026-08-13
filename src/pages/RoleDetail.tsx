import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { NotFound } from '@/pages/NotFound'
import { roles, getRole } from '@/lib/roles'
import { useSeo } from '@/lib/seo'
import { site } from '@/lib/site'

function BulletList({ items, marker }: { items: string[]; marker: 'check' | 'dash' }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          {marker === 'check' ? (
            <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          ) : (
            <span className="mt-2 h-px w-3 shrink-0 bg-accent" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function RoleDetail() {
  const { slug } = useParams()
  const role = getRole(slug ?? '')
  useSeo({
    title: role ? `${role.title} — Hiring` : 'Not found',
    description: role?.summary,
  })
  if (!role) return <NotFound />

  const index = roles.findIndex((r) => r.slug === role.slug)
  const next = roles[(index + 1) % roles.length]
  const applySubject = encodeURIComponent(`Application — ${role.title} (${role.ref})`)
  const facts: [string, string][] = [
    ['role', role.ref],
    ['discipline', role.discipline],
    ['location', role.location],
    ['type', role.type],
    ['client', role.client],
    ['status', role.status],
  ]

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
          <Link
            to="/hiring"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All roles
          </Link>

          <Reveal className="mt-8">
            <div className="flex items-center gap-3">
              <span className="mono-label text-accent">{role.ref}</span>
              <Badge variant="accent">{role.status}</Badge>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {role.title}
            </h1>
            <p className="mt-3 font-display text-lg text-accent">{role.discipline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{role.location}</Badge>
              <Badge>{role.type}</Badge>
            </div>
            <a
              href={`${site.social.email}?subject=${applySubject}`}
              className="mt-7 inline-block"
            >
              <Button size="lg">Apply for this role</Button>
            </a>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-ink">About the role</h2>
            {role.about.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {role.note && (
              <p className="mt-5 rounded-[var(--radius-card)] border border-accent/25 bg-accent/[0.06] p-4 text-sm leading-relaxed text-ink/90">
                {role.note}
              </p>
            )}
          </Reveal>

          <Reveal className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-xl font-semibold text-ink">What you’ll do</h2>
            <BulletList items={role.responsibilities} marker="dash" />
          </Reveal>

          <Reveal className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              What you need <span className="mono-label align-middle">must-have</span>
            </h2>
            <BulletList items={role.mustHave} marker="check" />
          </Reveal>

          <Reveal className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              What helps <span className="mono-label align-middle">nice-to-have</span>
            </h2>
            <BulletList items={role.niceToHave} marker="dash" />
          </Reveal>

          <Reveal className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-xl font-semibold text-ink">What’s on offer</h2>
            <BulletList items={role.offer} marker="dash" />
          </Reveal>

          <Reveal className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <h2 className="font-display text-xl font-semibold text-ink">How to apply</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Send your CV and a line on why this role fits. Meeting most of the must-haves is
              enough — apply. All approaches are handled confidentially.
            </p>
            <a
              href={`${site.social.email}?subject=${applySubject}`}
              className="mt-5 inline-block"
            >
              <Button>Apply — {site.email}</Button>
            </a>
          </Reveal>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="sticky top-24 rounded-[var(--radius-card)] border border-line bg-surface">
            <div className="border-b border-line px-5 py-3">
              <span className="mono-label">role spec</span>
            </div>
            <dl className="divide-y divide-line">
              {facts.map(([k, v]) => (
                <div key={k} className="px-5 py-3">
                  <dt className="mono-label">{k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <Link to={`/hiring/${next.slug}`} className="group flex items-center justify-between gap-4">
            <div>
              <span className="mono-label">Next role</span>
              <div className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-accent">
                {next.title}
              </div>
            </div>
            <ArrowLeft className="size-6 rotate-180 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </div>
      </section>
    </>
  )
}
