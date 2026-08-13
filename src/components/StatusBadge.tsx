import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

// Signature element: a build/status-badge that reads like a CI pill.
// The pulsing dot signals "currently available".
export function StatusBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 font-mono text-[0.7rem] uppercase tracking-wide text-muted',
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {site.availability}
    </span>
  )
}
