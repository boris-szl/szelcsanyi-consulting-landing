import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { NotFound } from '@/pages/NotFound'
import { projects } from '@/lib/content'

export function WorkDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  const sections: [string, string, string][] = [
    ['01', 'The problem', project.problem],
    ['02', 'What I did', project.work],
    ['03', 'The outcome', project.outcome],
  ]

  const facts: [string, string][] = [
    ['role', project.role],
    ['period', project.period],
    ['status', project.status],
    ['domain', project.domain],
  ]

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All work
          </Link>

          <Reveal className="mt-8">
            <div className="flex items-center gap-3">
              <span className="mono-label text-accent">{project.ref}</span>
              <Badge variant={project.status === 'Advisory' ? 'default' : 'accent'}>
                {project.status}
              </Badge>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 font-display text-xl italic text-ink/80">
              “{project.tagline}”
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
            <a href={project.url} target="_blank" rel="noreferrer" className="mt-7 inline-block">
              <Button variant="outline">
                Visit {project.name} <ArrowUpRight className="size-4" />
              </Button>
            </a>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="order-2 lg:order-1">
          {sections.map(([num, heading, body]) => (
            <Reveal key={num} className="border-t border-line py-8 first:border-t-0 first:pt-0">
              <div className="flex items-baseline gap-3">
                <span className="mono-label text-accent">§{num}</span>
                <h2 className="font-display text-2xl font-semibold text-ink">{heading}</h2>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>

        <aside className="order-1 lg:order-2">
          <div className="sticky top-24 rounded-[var(--radius-card)] border border-line bg-surface">
            <div className="border-b border-line px-5 py-3">
              <span className="mono-label">datasheet</span>
            </div>
            <dl className="divide-y divide-line">
              {facts.map(([k, v]) => (
                <div key={k} className="px-5 py-3">
                  <dt className="mono-label">{k}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-line px-5 py-4">
              <span className="mono-label">stack</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <div>
              <span className="mono-label">Next</span>
              <div className="mt-1 font-display text-2xl font-semibold text-ink group-hover:text-accent">
                {next.name}
              </div>
            </div>
            <ArrowRight className="size-6 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
