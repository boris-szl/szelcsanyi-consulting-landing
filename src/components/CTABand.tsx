import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
import { Reveal } from '@/components/Reveal'
import { site } from '@/lib/site'

export function CTABand() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface">
      <div className="accent-glow pointer-events-none absolute inset-x-0 bottom-[-40%] top-[10%]" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <StatusBadge />
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Have a system that needs to hold up? Let’s talk about it.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Tell me what you’re building and where it hurts. I’ll reply within a day with an
            honest read on whether — and how — I can help.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <Button size="lg">
                Book a call <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href={site.social.email}>
              <Button variant="outline" size="lg">
                {site.email}
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
