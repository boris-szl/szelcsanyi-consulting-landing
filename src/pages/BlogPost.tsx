import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { CTABand } from '@/components/CTABand'
import { NotFound } from '@/pages/NotFound'
import { posts, getPost, formatDate } from '@/lib/blog'
import { useSeo } from '@/lib/seo'

export function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug ?? '')
  useSeo({
    title: post ? post.title : 'Not found',
    description: post?.excerpt,
  })
  if (!post) return <NotFound />

  const index = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(index + 1) % posts.length]

  return (
    <>
      <article>
        <header className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" /> All writing
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <span className="mono-label text-accent">{formatDate(post.date)}</span>
              <span className="h-px w-6 bg-line" />
              <span className="mono-label">{post.readingTime}</span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div className="prose-datasheet">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
          <Reveal>
            <Link
              to={`/blog/${next.slug}`}
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <span className="mono-label">Next up</span>
                <div className="mt-1 font-display text-xl font-semibold text-ink group-hover:text-accent">
                  {next.title}
                </div>
              </div>
              <ArrowRight className="size-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
