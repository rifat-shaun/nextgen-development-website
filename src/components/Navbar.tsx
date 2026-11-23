import { useEffect, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { navItems, PHONES, telHref } from '../data'
import Logo from './Logo'

const navLink = 'block whitespace-nowrap px-2 py-2 text-[1rem] font-normal tracking-wide text-white transition-colors hover:text-accent'

function Navbar() {
  const [open, setOpen] = useState(false)
  // Mobile only: which dropdown is expanded (desktop uses hover)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { pathname, hash } = useLocation()
  // Pages that open with a photo banner get the see-through bar until the visitor scrolls.
  // Project detail pages start with the map and gallery, so the bar is always solid there
  const solidPage = pathname.startsWith('/projects/')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const transparent = !scrolled && !open && !solidPage

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
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow,padding] duration-300 ${
        transparent
          ? 'bg-gradient-to-b from-black/40 to-transparent py-3 lg:py-6'
          : 'bg-dropdown shadow-[0_2px_12px_rgba(0,0,0,0.2)]'
      }`}
    >
      <nav className={transparent ? 'py-2' : 'py-1.5'}>
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-10 min-[1400px]:px-16">
          <div className="shrink-0">
            <Logo compact={!transparent} />
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
            className={`${open ? 'block' : 'hidden'} max-h-[calc(100svh-5rem)] w-full overflow-y-auto lg:flex lg:max-h-none lg:w-auto lg:items-center lg:gap-6 lg:overflow-visible xl:gap-10`}
          >
            <ul className="mb-2 mt-3 divide-y divide-white/10 border-t border-white/10 lg:mb-0 lg:mt-0 lg:flex lg:gap-2 xl:gap-5 lg:divide-y-0 lg:border-0">
              {navItems.map((item) => {
                const isOpen = expanded === item.label
                return (
                  <li key={item.label} className="group relative">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        className={`${navLink} flex flex-1 items-center gap-1.5 py-3 lg:py-2 ${
                          isActive(item.href, item.children) ? '!text-accent' : ''
                        }`}
                      >
                        {item.label}
                        {item.children && <HiChevronDown className="hidden text-sm opacity-80 lg:block" />}
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

            <div className="pb-3 lg:border-l lg:border-white/25 lg:pb-0 lg:pl-6 xl:pl-8">
              {/* Mobile: one call button per number. Desktop: numbers stacked on the right */}
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-0">
                {PHONES.map((phone) => (
                  <a
                    key={phone}
                    href={telHref(phone)}
                    className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent py-3 font-medium text-white transition-colors lg:justify-end lg:bg-transparent lg:py-0 lg:text-[0.95rem] lg:font-normal ${transparent ? 'lg:leading-6' : 'lg:leading-5'} lg:hover:text-accent`}
                  >
                    <FaPhoneAlt className="text-sm lg:text-xs" />
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
