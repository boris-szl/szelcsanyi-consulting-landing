import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { roles } from '@/lib/roles'
import { useSeo } from '@/lib/seo'

export function Roles() {
  useSeo({
    title: 'Hiring',
    description:
      'Open roles I’m recruiting for, and global tech-talent search — currently OT/ICS and IT infrastructure architects for critical-infrastructure programmes.',
  })

  return (
    <>
      <PageHeader
        eyebrowRef="§ HIRING"
        eyebrow="Recruiting"
        title="I place senior tech talent — globally."
        intro="Alongside building, I recruit hard-to-find engineers and architects worldwide. These are the searches I’m running right now."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <Globe className="size-5 text-accent" strokeWidth={1.6} />
            <span className="mono-label">{roles.length} open roles · worldwide</span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
          {roles.map((role, i) => (
            <Reveal key={role.slug} delay={i * 60}>
              <Link
                to={`/hiring/${role.slug}`}
                className="group grid gap-4 py-7 transition-colors hover:bg-surface-2/40 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-accent">{role.ref}</span>
                    <Badge variant="accent">{role.status}</Badge>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:text-accent">
                    {role.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-accent">{role.discipline}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {role.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{role.location}</Badge>
                    <Badge>{role.type}</Badge>
                  </div>
                </div>
                <ArrowUpRight className="hidden size-6 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Hiring for something else — or looking for your next role? I keep a global network
            of senior engineers and architects. Reach out and tell me what you need.
          </p>
        </Reveal>
      </section>

      <CTABand />
    </>
  )
}
