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
      <Link to="/" className="inline-block overflow-hidden rounded-xl bg-[#03152d] shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
        <img src={logoFull} alt={COMPANY} width={210} height={140} className="block h-auto w-[210px]" />
      </Link>
    )
  }

  return (
    <Link to="/" className="flex items-center gap-3 text-white">
      <span className="flex h-12 w-[69px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#03152d] shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
        <img src={logoMark} alt="" width={69} height={48} className="h-full w-full object-cover" />
      </span>
      <span className="flex flex-col font-heading leading-none whitespace-nowrap">
        <span className="text-lg font-semibold tracking-wide">
          NextGen <span className="font-normal text-white/80">Reality</span>
        </span>
        <span className="mt-1 text-xs tracking-[0.2em] text-white/70 uppercase">&amp; Consultant</span>
      </span>
    </Link>
  )
}

export default Logo
