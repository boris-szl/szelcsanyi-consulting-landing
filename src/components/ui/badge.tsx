import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wide uppercase',
  {
    variants: {
      variant: {
        default:
          'rounded-full border border-line bg-surface px-2.5 py-1 text-muted',
        solid: 'rounded-full bg-surface-2 px-2.5 py-1 text-ink',
        accent:
          'rounded-full border border-accent/30 bg-accent/[0.06] px-2.5 py-1 text-accent',
        plain: 'text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
