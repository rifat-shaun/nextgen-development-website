import type { IconType } from 'react-icons'
import { FiHome, FiMapPin, FiMessageCircle, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type Reason = { icon: IconType; title: string; text: string; href?: string; highlight?: boolean }

const reasons: Reason[] = [
  {
    icon: FiMapPin,
    title: 'About Us',
    text: 'A real estate agency guiding you to quality, sustainable homes.',
    href: '/about',
  },
  {
    icon: FiUsers,
    title: 'Client Driven',
    text: 'We involve you in every step, from the first concept to the final handover.',
  },
  {
    icon: FiHome,
    title: 'Local Expertise',
    text: "Based in Macquarie Fields and building across Sydney's South West.",
  },
  {
    icon: FiMessageCircle,
    title: 'Planning a Project?',
    text: 'Book a free, no-obligation consultation.',
    href: '/contact',
    highlight: true,
  },
]

function WhyNextGen() {
  return (
    <section className="bg-white py-[60px] md:py-20">
      <div className="container-bs">
        <h2 className="reveal mb-12 text-center !text-[2rem] !font-light !text-body md:mb-16 md:!text-[2.25rem]">
          Why NextGen?
        </h2>

        <div className="reveal grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {reasons.map(({ icon: Icon, title, text, href, highlight }) => {
            const tone = highlight ? 'text-accent' : 'text-[#3d3d4a]'
            const content = (
              <>
                <Icon
                  aria-hidden
                  strokeWidth={1.4}
                  className={`mx-auto mb-6 h-16 w-16 transition-transform duration-300 group-hover:-translate-y-1 ${tone}`}
                />
                <h3 className={`mb-3 !text-[1.5rem] !font-light ${highlight ? '!text-accent' : '!text-body'}`}>
                  {title}
                </h3>
                <p className={`mx-auto m-0 max-w-[240px] text-[0.9rem] leading-[1.5] ${highlight ? 'text-accent' : 'text-[#9a9a9a]'}`}>
                  {text}
                </p>
              </>
            )
            return href ? (
              <Link key={title} to={href} className="group block text-center">
                {content}
              </Link>
            ) : (
              <div key={title} className="group text-center">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyNextGen
