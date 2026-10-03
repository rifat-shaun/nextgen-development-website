import { useEffect, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { navItems, PHONE } from '../data'
import Logo from './Logo'

const tel = `tel:${PHONE.replace(/\s/g, '')}`

const navLink = 'block px-2 py-2 text-[1.075rem] font-medium tracking-wide text-white transition-colors hover:text-accent'

function Navbar() {
  const [open, setOpen] = useState(false)
  // Mobile only: which dropdown is expanded (desktop uses hover)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { pathname, hash } = useLocation()

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [pathname, hash])

  const isActive = (href: string, children?: { href: string }[]) =>
    href === '/'
      ? pathname === '/'
      : (children ?? [{ href }]).some((c) => c.href.startsWith('/') && !c.href.includes('#') && c.href === pathname)

  return (
    <header className="sticky top-0 z-30 bg-brand">
      <nav className="py-2">
        <div className="container-bs flex flex-wrap items-center justify-between">
          <div className="lg:w-1/4">
            <Logo />
          </div>

          <button
            className="rounded-md border border-white/10 px-3 py-1 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg viewBox="0 0 30 30" className="h-[1.5em] w-[1.5em]">
              <path
                stroke="rgba(255,255,255,0.55)"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </button>

          <div
            className={`${open ? 'block' : 'hidden'} max-h-[calc(100svh-4rem)] w-full overflow-y-auto lg:flex lg:max-h-none lg:w-3/4 lg:items-center lg:overflow-visible`}
          >
            <ul className="mb-2 mt-2 divide-y divide-white/10 border-t border-white/10 lg:mb-0 lg:mt-0 lg:flex lg:w-2/3 lg:justify-center lg:gap-6 lg:divide-y-0 lg:border-0">
              {navItems.map((item) => {
                const isOpen = expanded === item.label
                return (
                  <li key={item.label} className="group relative">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        className={`${navLink} flex-1 py-3 lg:py-2 ${item.children ? 'lg:caret' : ''} ${
                          isActive(item.href, item.children) ? '!text-accent' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} menu`}
                          aria-expanded={isOpen}
                          className="flex h-10 w-10 items-center justify-center rounded-md text-xl text-white hover:bg-white/10 lg:hidden"
                        >
                          <HiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {item.children && (
                      <ul
                        className={`${isOpen ? 'block' : 'hidden'} mb-3 rounded-[0.375rem] bg-dropdown py-2 lg:absolute lg:left-0 lg:top-full lg:z-10 lg:mb-0 lg:hidden lg:min-w-[10rem] lg:border lg:border-black/[0.175] lg:group-hover:block`}
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              className={`block px-4 py-2 text-[0.95rem] text-white hover:bg-accent lg:whitespace-nowrap lg:py-1 lg:text-[0.9rem] ${
                                child.href === pathname ? 'bg-accent' : ''
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="pb-3 lg:w-1/3 lg:pb-0 lg:text-right">
              <a
                href={tel}
                className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-lg font-medium text-white lg:mr-4 lg:inline-block lg:bg-transparent lg:py-[0.3125rem] lg:text-xl lg:font-normal"
              >
                <FaPhoneAlt className="text-sm lg:hidden" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
