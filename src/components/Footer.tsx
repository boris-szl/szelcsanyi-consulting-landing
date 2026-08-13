import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { nav, site } from '@/lib/site'
import { StatusBadge } from '@/components/StatusBadge'
import { Wordmark } from '@/components/Wordmark'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline} Remote-first from {site.location}, working across {site.timezone}.
            </p>
            <div className="mt-5">
              <StatusBadge />
            </div>
          </div>

          <div>
            <p className="mono-label">Sitemap</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label">Direct</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={site.social.email}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.github}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                >
                  GitHub <ArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                >
                  LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
            © {site.brandFull} · {site.owner}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted">
            {site.location} · {site.timezone}
          </p>
        </div>
      </div>
    </footer>
  )
}
