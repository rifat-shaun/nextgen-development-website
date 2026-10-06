import { useEffect, useRef, useState } from 'react'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { reviews as allReviews } from '../data'

// Sample reviews are for previewing only; never publish them in production
const reviews = import.meta.env.PROD ? allReviews.filter((r) => !r.sample) : allReviews

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const navButton =
  'flex h-11 w-11 items-center justify-center rounded-full bg-accent text-2xl text-white shadow-[0_5px_15px_rgba(255,102,0,0.3)] transition-[background-color,transform,opacity] duration-300 hover:scale-105 hover:bg-[#e65c00] disabled:pointer-events-none disabled:bg-[#bdc3c7] disabled:shadow-none'

function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  // Enable/disable the arrows based on the scroll position
  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current
    const card = el?.querySelector<HTMLElement>('[data-review]')
    if (!el || !card) return
    el.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: 'smooth' })
  }

  if (reviews.length === 0) return null

  return (
    <section id="reviews" className="scroll-mt-16 bg-[#f8f9fa] py-[60px] md:py-20">
      <div className="container-bs">
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-[640px]">
            <h2 className="!text-[2rem] md:!text-[2.5rem]">WHAT OUR CLIENTS SAY</h2>
            <span className="mx-auto mb-5 mt-4 block h-[3px] w-16 rounded-full bg-accent md:mx-0" />
            <p className="m-0 text-base leading-[1.6] text-[#666]">
              Hear from the families and investors we have worked with.
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => scroll(-1)} disabled={!canPrev} aria-label="Previous reviews" className={navButton}>
              <HiChevronLeft />
            </button>
            <button type="button" onClick={() => scroll(1)} disabled={!canNext} aria-label="Next reviews" className={navButton}>
              <HiChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="reveal -mx-3 flex snap-x snap-mandatory scroll-px-3 gap-6 overflow-x-auto scroll-smooth px-3 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, i) => (
            <article
              key={i}
              data-review
              className="group relative flex w-full shrink-0 snap-start flex-col rounded-2xl bg-white p-6 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(0,76,145,0.15)] md:p-8 md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <FaQuoteLeft className="absolute right-7 top-7 text-4xl text-brand/10 transition-colors duration-300 group-hover:text-accent/20" />

              <div className="mb-4 flex gap-1 text-[#ffc107]" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, star) => (
                  <FaStar key={star} className={star < review.rating ? '' : 'text-[#dee2e6]'} />
                ))}
              </div>

              <p className="mb-6 flex-1 text-[0.95rem] leading-[1.7] text-[#555]">“{review.text}”</p>

              <div className="flex items-center gap-4 border-t border-[#eef1f4] pt-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand font-heading font-semibold text-white">
                  {initials(review.name)}
                </span>
                <div className="min-w-0">
                  <p className="m-0 font-semibold text-body">{review.name}</p>
                  <p className="m-0 text-sm text-[#6c757d]">{review.project}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
