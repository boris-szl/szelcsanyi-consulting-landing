import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/Reveal'

interface PageHeaderProps {
  eyebrowRef: string
  eyebrow: string
  title: string
  intro?: string
}

export function PageHeader({ eyebrowRef, eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <SectionEyebrow mark={eyebrowRef}>{eyebrow}</SectionEyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
