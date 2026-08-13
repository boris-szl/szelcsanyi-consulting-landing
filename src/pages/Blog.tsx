import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { posts, formatDate } from '@/lib/blog'

export function Blog() {
  return (
    <>
      <PageHeader
        eyebrowRef="§ WRITING"
        eyebrow="Writing"
        title="Notes from the work."
        intro="Field notes on building dependable systems, reading slow queries, and doing consulting that actually leaves a team stronger."
      />

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="border-t border-line">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link
                to={`/blog/${post.slug}`}
                className="group grid gap-3 border-b border-line py-8 transition-colors hover:bg-surface sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <div className="flex flex-col gap-1">
                  <span className="mono-label">{formatDate(post.date)}</span>
                  <span className="mono-label">{post.readingTime}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold leading-snug text-ink group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                    <span className="ml-auto hidden items-center gap-1 text-sm font-medium text-ink sm:inline-flex">
                      Read
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
