import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { projects } from '@/lib/content'

export function Work() {
  return (
    <>
      <PageHeader
        eyebrowRef="§ WORK"
        eyebrow="Portfolio"
        title="The products I’ve founded, led, and advised."
        intro="Real ventures across security-tech, marketplaces, and edtech — in the EU, the UAE, and Turkey. Some I run as CTO; others I steer as an advisor."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 80}>
              <Link
                to={`/work/${project.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label text-accent">{project.ref}</span>
                  <Badge variant={project.status === 'Advisory' ? 'default' : 'accent'}>
                    {project.status}
                  </Badge>
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold text-ink group-hover:text-accent">
                    {project.name}
                  </h2>
                  <span className="mono-label whitespace-nowrap">{project.period}</span>
                </div>

                <p className="mt-1 text-sm font-medium text-accent">{project.role}</p>
                <p className="mt-4 font-display text-lg italic text-ink/80">
                  “{project.tagline}”
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink">
                  Read the case
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
