import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-accent text-[var(--color-accent-ink)] font-semibold hover:brightness-110 hover:shadow-[0_0_24px_-6px_var(--color-accent)] rounded-[var(--radius-card)]',
        accent:
          'bg-accent text-[var(--color-accent-ink)] font-semibold hover:brightness-110 hover:shadow-[0_0_24px_-6px_var(--color-accent)] rounded-[var(--radius-card)]',
        outline:
          'border border-line-strong bg-transparent text-ink hover:border-accent hover:text-accent rounded-[var(--radius-card)]',
        ghost:
          'bg-transparent text-ink hover:bg-surface-2 rounded-[var(--radius-card)]',
        link: 'text-accent underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-3.5 text-sm',
        lg: 'h-12 px-6 text-[0.95rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
