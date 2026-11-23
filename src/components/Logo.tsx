import { Link } from 'react-router-dom'
import { COMPANY } from '../data'

type Props = {
  // Smaller wordmark for the solid (scrolled / inner page) navbar
  compact?: boolean
}

function Logo({ compact = false }: Props) {
  // Text wordmark, letter-spaced like a classic agency logo
  return (
    <Link to="/" aria-label={COMPANY} className="inline-flex flex-col items-center text-white">
      <span
        className={`font-heading leading-none font-semibold tracking-[0.12em] transition-[font-size] duration-300 ${
          compact ? 'text-[1.35rem] sm:text-[1.5rem]' : 'text-[1.6rem] sm:text-[2rem] lg:text-[2.25rem]'
        }`}
      >
        NEXTGEN
      </span>
      <span
        className={`font-medium tracking-[0.3em] whitespace-nowrap text-white/90 uppercase ${
          compact ? 'mt-1 text-[0.55rem] sm:text-[0.6rem]' : 'mt-1.5 text-[0.62rem] sm:text-[0.72rem] lg:text-[0.8rem]'
        }`}
      >
        Realty &amp; Consultant
      </span>
    </Link>
  )
}

export default Logo
