import { cn } from '@/lib/utils'

// The lowercase, two-tone brand mark from the Figma logo:
// "szelcsanyi" in slate, "consulting" in green.
export function Wordmark({
  className,
  stacked = false,
}: {
  className?: string
  stacked?: boolean
}) {
  return (
    <span
      className={cn(
        'wordmark inline-flex text-ink',
        stacked ? 'flex-col' : 'flex-row items-baseline gap-[0.28em]',
        className,
      )}
      aria-label="szelcsanyi consulting"
    >
      <span>szelcsanyi</span>
      <span className="text-accent">consulting</span>
    </span>
  )
}
