import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { ADDRESS, aboutLinks, COMPANY, EMAIL, PERSONAL_EMAIL, PHONE, serviceDetails, serviceHref, services } from '../data'
import Logo from './Logo'

// Hidden until the real social media accounts are ready; set to true to show the icons
const SHOW_SOCIALS = false

const socials = [
  { label: 'Instagram', icon: FaInstagram, hover: 'hover:bg-[#e4405f]' },
  { label: 'LinkedIn', icon: FaLinkedinIn, hover: 'hover:bg-[#0077b5]' },
  { label: 'Facebook', icon: FaFacebookF, hover: 'hover:bg-[#1877f2]' },
  { label: 'Twitter', icon: FaTwitter, hover: 'hover:bg-[#1da1f2]' },
]

const column = 'mb-6 w-full px-3 md:w-1/2 lg:w-1/4'
const title = 'mb-[25px] mt-[30px] text-center !text-[1.2rem] !font-semibold !text-white md:mt-0 md:text-left'

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="m-0 list-none p-0 text-center md:text-left">
      {links.map((link) => (
        <li key={link.label} className="mb-3">
          <Link
            to={link.href}
            className="text-[0.95rem] text-muted no-underline transition-all duration-300 hover:pl-[5px] hover:text-[#e67e22]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-bold">{children}</strong>
}

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-footer pb-5 pt-10 text-white md:pt-[50px] lg:pb-[30px] lg:pt-[60px]"
    >
      <div className="container-bs">
        <div className="-mx-3 flex flex-wrap">
          <div className={column}>
            <div className="mb-[30px]">
              <div className="mb-5 flex items-center justify-center gap-[15px] md:justify-start">
                <Logo variant="full" />
              </div>
              <p className="text-center text-[0.95rem] leading-[1.6] text-muted md:max-w-[280px] md:text-left">
                {COMPANY} is an artisan building company delivering quality craftsmanship with
                sustainability at its core. We are a partner in creating community-focused,
                client-driven projects that build a better future.
              </p>
            </div>
          </div>

          <div className={column}>
            <h4 className={title}>Service</h4>
            <FooterLinks
              links={[
                ...services.map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
                ...serviceDetails
                  .filter((s) => s.category === 'Project management')
                  .map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
              ]}
            />
          </div>

          <div className={column}>
            <h4 className={title}>About us</h4>
            <FooterLinks links={aboutLinks} />
          </div>

          <div className={column}>
            <h4 className={title}>Contact Us</h4>
            <div className="text-center md:text-left">
              <p>
                <Strong>Company Name:</Strong> {COMPANY}
              </p>
              <p>
                <Strong>Email:</Strong>{' '}
                <a href={`mailto:${EMAIL}`} className="text-white no-underline">
                  {EMAIL}
                </a>
              </p>
              <p>
                <Strong>Personal Email:</Strong>{' '}
                <a href={`mailto:${PERSONAL_EMAIL}`} className="text-white no-underline">
                  {PERSONAL_EMAIL}
                </a>
              </p>
              <p>
                <Strong>Phone:</Strong>{' '}
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-white no-underline">
                  {PHONE}
                </a>
              </p>
              <p>
                <Strong>Address:</Strong> {ADDRESS}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[50px] flex flex-col items-center justify-between gap-5 border-t border-footer-light pt-[25px] text-center md:flex-row md:gap-0 md:text-left">
          <p className="m-0 text-[0.9rem] text-muted">
            Copyright © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          {SHOW_SOCIALS && (
            <div className="flex gap-[15px]">
              {socials.map(({ label, icon: Icon, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-footer-light text-base text-muted no-underline transition-all duration-300 hover:-translate-y-[3px] hover:text-white ${hover}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
