import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Wordmark } from '@/components/Wordmark'
import { cn } from '@/lib/utils'
import { nav, site } from '@/lib/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-transparent bg-bg/80 backdrop-blur-md transition-colors',
        scrolled && 'border-line',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label={site.brandFull}>
          <Wordmark className="text-xl" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-[var(--radius-card)] px-3 py-2 text-sm text-muted transition-colors hover:text-ink',
                  isActive && 'text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden md:block">
            <Button size="sm">Book a call</Button>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-[var(--radius-card)] text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'border-b border-line/70 py-3 text-base text-muted last:border-0',
                    isActive && 'text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="pt-4">
              <Button className="w-full">Book a call</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
