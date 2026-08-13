import { Quote } from 'lucide-react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/Reveal'
import { testimonials } from '@/lib/content'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <Reveal>
        <SectionEyebrow ref="§06">Endorsements</SectionEyebrow>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          What the people I’ve built with say.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          From colleagues and managers at nu.Education and CLEO AG — verbatim from LinkedIn.
        </p>
      </Reveal>

      <div className="mt-12 gap-6 md:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 80}>
            <figure className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
              <Quote className="size-6 text-accent" strokeWidth={1.6} aria-hidden />
              <blockquote className="mt-4 leading-relaxed text-ink/90">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-mono text-xs font-medium text-accent">
                  {initials(t.name)}
                </span>
                <span className="flex flex-col">
                  <span className="font-display font-semibold text-ink">{t.name}</span>
                  <span className="mono-label normal-case tracking-normal">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
