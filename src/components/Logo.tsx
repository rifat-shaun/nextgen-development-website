import { Link } from 'react-router-dom'
import logoFull from '../assets/logo-full.webp'
import logoMark from '../assets/logo-mark.webp'
import { COMPANY } from '../data'

type Props = {
  // "nav": emblem + company name for the navbar; "full": the complete logo artwork
  variant?: 'nav' | 'full'
}

function Logo({ variant = 'nav' }: Props) {
  if (variant === 'full') {
    return (
      <Link to="/" className="inline-block overflow-hidden rounded-xl bg-[#ebe4d9] shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
        <img src={logoFull} alt={COMPANY} width={180} height={179} className="block h-auto w-[180px]" />
      </Link>
    )
  }

  return (
    <Link to="/" className="flex items-center gap-3 text-white">
      <span className="flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#ebe4d9] shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
        <img src={logoMark} alt="" width={48} height={41} className="h-full w-full object-cover" />
      </span>
      <span className="font-heading text-lg leading-none font-semibold tracking-wide whitespace-nowrap">
        NextGen <span className="font-normal text-white/80">Building</span>
      </span>
    </Link>
  )
}

export default Logo
