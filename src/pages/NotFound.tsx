import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-5 py-24 sm:px-8">
      <span className="mono-label text-accent">HTTP 404</span>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
        No route matched.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        The page you were after doesn’t exist — or has been refactored away. Let’s get you back
        to something that resolves.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Back to home</Button>
      </Link>
    </section>
  )
}
