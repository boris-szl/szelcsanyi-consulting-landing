import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/StatusBadge'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { services, projects, stats, stack } from '@/lib/content'
import { posts, formatDate } from '@/lib/blog'
import { useSeo } from '@/lib/seo'
import { site } from '@/lib/site'

const specRows: [string, string][] = [
  ['role', 'Fractional CTO & engineer'],
  ['focus', 'Security-tech · marketplaces'],
  ['stack', 'TypeScript · Node · React · Postgres'],
  ['engagement', 'Founder · fractional · advisory'],
  ['timezone', `${site.timezone} · remote-first`],
]

export function Home() {
  useSeo({ title: 'szelcsanyi consulting — Software engineering, shipped' })
  const latest = posts.slice(0, 2)
  const featured = projects.slice(0, 3)

  return (
    <>
      {/* §00 — Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_90%_at_20%_0%,black,transparent)]" />
        <div className="accent-glow pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:py-28">
          <div>
            <Reveal delay={0}>
              <StatusBadge />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl">
                Software engineering,{' '}
                <span className="relative whitespace-nowrap text-accent">
                  actually shipped
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="8"
                    viewBox="0 0 300 8"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 5.5C60 2.5 120 2 298 4.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I’m a freelance engineer and fractional CTO. I’ve founded and led the
                engineering — web, backend, and React Native mobile — behind security-tech and
                marketplace products across the EU, the UAE, and Turkey, and I leave teams with
                systems they can run without me.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/contact">
                  <Button size="lg">
                    Start a project <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link to="/work">
                  <Button variant="outline" size="lg">
                    See the work
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Signature: the engagement datasheet */}
          <Reveal delay={200} className="lg:pt-2">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_1px_0_rgba(20,23,28,0.04),0_18px_40px_-24px_rgba(20,23,28,0.25)]">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="mono-label">datasheet · {site.brand}</span>
                <span className="font-mono text-[0.7rem] text-accent">rev. 2026.3</span>
              </div>
              <dl className="divide-y divide-line">
                {specRows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                    <dt className="mono-label shrink-0">{k}</dt>
                    <dd className="text-right text-sm font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center justify-between border-t border-line bg-surface-2/40 px-5 py-3">
                <span className="mono-label">availability</span>
                <span className="font-mono text-[0.7rem] font-medium text-ink">
                  {site.availability}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §01 — Services */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionEyebrow ref="§01">What I do</SectionEyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From architecture to mobile — the ways I help teams ship.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.ref} delay={i * 60}>
              <div className="group h-full bg-surface p-7 transition-colors hover:bg-surface-2/50">
                <div className="flex items-center justify-between">
                  <service.icon className="size-6 text-accent" strokeWidth={1.6} />
                  <span className="mono-label">{service.ref}</span>
                </div>
                <h3 className="mt-6 text-xl text-ink">{service.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{service.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* §02 — Selected work */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionEyebrow ref="§02">Selected work</SectionEyebrow>
                <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Systems built to hold up under real traffic.
                </h2>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent"
              >
                All work <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-col divide-y divide-line border-y border-line">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <Link
                  to={`/work/${project.slug}`}
                  className="group grid gap-4 py-7 transition-colors hover:bg-surface-2/50 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-8"
                >
                  <div className="flex items-baseline gap-4 sm:flex-col sm:items-start sm:gap-1.5">
                    <span className="mono-label text-accent">{project.ref}</span>
                    <span className="font-display text-xl font-semibold text-ink">
                      {project.name}
                    </span>
                    <span className="mono-label">{project.role}</span>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <span className="mono-label whitespace-nowrap">{project.domain}</span>
                    <ArrowUpRight className="size-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §03 — About teaser */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionEyebrow ref="§03">About</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A senior engineer you can hand the hard part to.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              I’ve been the first engineer at seed-stage startups and the person brought in
              to steady systems at scale. I care about the unglamorous things — clear
              boundaries, honest observability, and code the next person can read.
            </p>
            <Link to="/about" className="mt-7 inline-block">
              <Button variant="outline">More about me</Button>
            </Link>
            <div className="mt-9 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:pt-16">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface p-6">
                  <dt className="font-display text-3xl font-semibold text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* §04 — Writing */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionEyebrow ref="§04">Writing</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Notes from the work.
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent"
              >
                All writing <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-colors hover:border-line-strong hover:bg-surface-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="mono-label">{formatDate(post.date)}</span>
                    <span className="h-px w-6 bg-line" />
                    <span className="mono-label">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl leading-snug text-ink group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
                    Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
