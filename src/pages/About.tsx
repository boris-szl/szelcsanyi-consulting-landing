import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { stack, stats } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { site } from '@/lib/site'

const principles: [string, string][] = [
  [
    'Own the outcome, not the ticket',
    'I take responsibility for the system working in production — not just for the code I was handed. That founder’s reflex is what I bring to every engagement.',
  ],
  [
    'Boring where it counts',
    'I spend novelty budget on the core problem and reach for proven, well-understood technology everywhere else. Reliability compounds; cleverness rarely does.',
  ],
  [
    'Instrument, then decide',
    'No performance work, no architecture call, and no rewrite without data first. I measure, then move — and I keep the trade-offs visible the whole way.',
  ],
  [
    'Leave it maintainable',
    'Good consulting makes itself replaceable. I write the runbooks, pair with your team, and hand back systems people can run without me.',
  ],
]

const timeline: { period: string; role: string; org: string; note: string }[] = [
  {
    period: 'Jun 2026 — now',
    role: 'Founder & CTO',
    org: 'Nisura',
    note: 'The European CRQ engine — translating an attack surface into financial exposure and NIS2 liability.',
  },
  {
    period: 'Jan 2026 — now',
    role: 'Co-Founder & CTO',
    org: 'OnDuty AI',
    note: 'The digital backbone for modern field teams — I architect and lead the development.',
  },
  {
    period: '2026 — now',
    role: 'Lead Engineer & Technical Advisor',
    org: 'BookSecurity · Yükbul · PSM Austria · EasyPrep',
    note: 'Architecting and advising marketplaces and platforms across the UAE, Turkey, and Austria.',
  },
  {
    period: '2022 — 2025',
    role: 'Software Engineering Lead → Backend Lead',
    org: 'nu. education — Zurich',
    note: 'Grew from engineer to lead over 3.5 years, building next-gen vocational learning on Spring Boot and Kubernetes.',
  },
  {
    period: '2022 — 2023',
    role: 'Software Consultant & Engineer',
    org: 'CLEO AG — Zurich',
    note: 'Consulting and delivery on Spring Boot / Spring MVC systems.',
  },
  {
    period: '2018 — 2020',
    role: 'Co-Founder',
    org: 'Advertilio GmbH — Vienna',
    note: 'Deep-tech startup using computer vision and ML to read visual appearance and body language in real time for DOOH. Acquired.',
  },
]

const education: { period: string; degree: string; org: string; note: string }[] = [
  {
    period: '2025 — 2026',
    degree: 'MSc, Computer Science',
    org: 'University of St.Gallen (HSG)',
    note: 'Left to focus on my own ventures.',
  },
  {
    period: '2021 — 2024',
    degree: 'BSc, Technical Mathematics · Minor in Computer Science',
    org: 'TU Wien',
    note: 'Software quality assurance, JUnit, and the mathematical foundations behind the systems I build.',
  },
  {
    period: '2019 — 2023',
    degree: 'BA, Business Administration · Business Informatics',
    org: 'University of St.Gallen (HSG)',
    note: 'Thesis: “Investigation of Software Architectures for Smart Manufacturing Systems” (Prof. Dr. Ronny Seiger).',
  },
]

export function About() {
  useSeo({
    title: 'About',
    description:
      'Boris Szelcsányi — freelance software engineer & fractional CTO in Vienna and St. Gallen. Founder-CTO of OnDuty and Nisura; web, backend, and React Native mobile.',
  })
  return (
    <>
      <PageHeader
        eyebrowRef="§ ABOUT"
        eyebrow="About"
        title="A senior engineer you can hand the hard part to."
        intro={`I’m a freelance software engineer and fractional CTO based in ${site.location}. I build and lead the engineering behind security-tech and marketplace products.`}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="prose-datasheet max-w-none">
              <p>
                I’ve spent the last {site.years} years building software that other people
                depend on — and, since co-founding my first startup in 2018, founding the
                companies that ship it. Today I’m Co-Founder & CTO of <strong>OnDuty</strong>,
                Founder & CTO of <strong>Nisura</strong>, and the lead engineer or technical
                advisor behind several products across the EU, the UAE, and Turkey.
              </p>
              <p>
                My work clusters around two worlds: <strong>security-tech</strong> — where
                real-time operations, compliance, and trust are non-negotiable — and{' '}
                <strong>marketplaces</strong>, where the hard part is matching supply to demand
                fast and reliably. Before going independent I led backend engineering at{' '}
                <strong>nu. education</strong> in Zurich, and earlier co-founded{' '}
                <strong>Advertilio</strong>, a computer-vision startup we later exited.
              </p>
              <p>
                I studied Technical Mathematics at TU Wien and Computer Science at the
                University of St.Gallen — foundations I lean on daily. But what I actually enjoy
                is the unglamorous part: clear service boundaries, honest observability,
                working-time and compliance logic that holds up, and code the next engineer can
                read without me in the room. I like being the person a team can hand the hard
                part to — and trust to hand it back working.
              </p>
              <p>
                I also <strong>recruit senior tech talent globally</strong> — engineers and
                architects, including current searches for OT/ICS and IT-infrastructure
                architects on critical-infrastructure programmes. If you’re hiring for something
                hard to fill, or looking for your next role, that network is open to you.
              </p>
            </div>

            <div className="mt-9">
              <p className="mono-label">Tools I reach for</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
              <img
                src="/portrait.png"
                alt={`Portrait — ${site.brandFull}`}
                width={643}
                height={857}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="mono-label text-accent">Founder & CTO</span>
                <span className="mono-label">{site.location}</span>
              </figcaption>
            </figure>

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

      {/* Principles */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <Reveal>
            <SectionEyebrow ref="§ HOW">How I work</SectionEyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Four habits I don’t compromise on.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {principles.map(([title, body], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="h-full bg-surface p-7">
                  <span className="mono-label text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-xl text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionEyebrow ref="§ PATH">Track record</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Where I’ve been building.
          </h2>
        </Reveal>
        <div className="mt-10 border-t border-line">
          {timeline.map((item, i) => (
            <Reveal key={item.org} delay={i * 60}>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <span className="mono-label pt-1">{item.period}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-lg font-semibold text-ink">
                      {item.role}
                    </span>
                    <span className="text-sm font-medium text-accent">{item.org}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <SectionEyebrow ref="§ EDU">Education</SectionEyebrow>
        </Reveal>
        <div className="mt-8 border-t border-line">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 60}>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <span className="mono-label pt-1">{item.period}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-lg font-semibold text-ink">
                      {item.degree}
                    </span>
                    <span className="text-sm font-medium text-accent">{item.org}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link to="/contact">
            <Button size="lg">Work with me</Button>
          </Link>
        </Reveal>
      </section>

      <CTABand />
    </>
  )
}
