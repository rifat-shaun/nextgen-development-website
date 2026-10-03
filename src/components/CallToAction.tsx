import { FaPhoneAlt } from 'react-icons/fa'
import { EMAIL, PHONE } from '../data'

type Props = {
  title: string
  text: string
  className?: string
}

// Blue contact band used at the bottom of inner pages
function CallToAction({ title, text, className = 'bg-mint' }: Props) {
  return (
    <section className={`${className} py-[60px]`}>
      <div className="container-bs">
        <div className="reveal flex flex-col items-center gap-6 rounded-lg bg-brand p-8 text-center text-white md:flex-row md:justify-between md:p-12 md:text-left">
          <div>
            <h2 className="!text-white">{title}</h2>
            <p className="m-0 text-[0.95rem] opacity-90">{text}</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2 md:items-end">
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="flex items-center gap-3 rounded-lg bg-accent px-6 py-3 text-xl font-medium text-white transition-colors hover:bg-[#e65c00]"
            >
              <FaPhoneAlt className="text-base" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-[0.95rem] text-white/90 hover:text-white">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
