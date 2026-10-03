import { useEffect, useRef, useState } from 'react'
import { heroSlides } from '../data'

// Thin white chevrons for the carousel controls
const chevron = (d: string) =>
  `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='${d}'/%3e%3c/svg%3e")`
const prevIcon = chevron(
  'M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z',
)
const nextIcon = chevron(
  'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z',
)

const control =
  'absolute inset-y-0 z-[1] hidden w-[15%] items-center justify-center opacity-50 transition-opacity duration-150 hover:opacity-90 md:flex'

function Hero() {
  const [index, setIndex] = useState(0)
  const count = heroSlides.length

  // Swipe left/right on touch screens
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) setIndex((i) => (i + (dx < 0 ? 1 : -1) + count) % count)
    touchX.current = null
  }

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 5000)
    return () => clearInterval(timer)
  }, [index, count])

  return (
    <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-[600ms] ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== index}
              className="relative h-[32rem] w-full shrink-0 overflow-hidden min-[1395px]:h-[47rem]"
            >
              <img src={slide.image} alt="" className="h-full w-full object-cover" />
              <div
                className={`absolute bottom-12 left-4 right-4 z-10 rounded-2xl bg-brand p-6 text-white sm:p-8 md:left-[10%] md:right-auto md:w-[480px] md:p-10 lg:left-[15%] lg:p-12 min-[1920px]:w-1/4 ${
                  i === 1 ? 'md:text-right' : ''
                }`}
              >
                <h1 className="!text-white">{slide.title}</h1>
                <div className="opacity-75">
                  <p className="m-0 sm:text-lg sm:leading-[1.4] md:mb-5 md:text-xl">{slide.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex justify-center">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            className={`mx-[3px] box-content h-[3px] w-[30px] border-y-[10px] border-transparent bg-white bg-clip-padding transition-opacity duration-[600ms] ${
              i === index ? 'opacity-100' : 'opacity-50'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => setIndex((index - 1 + count) % count)}
        aria-label="Previous"
        className={`${control} left-0`}
      >
        <span
          className="h-8 w-8 bg-[length:100%_100%] bg-center bg-no-repeat"
          style={{ backgroundImage: prevIcon }}
        />
      </button>
      <button
        onClick={() => setIndex((index + 1) % count)}
        aria-label="Next"
        className={`${control} right-0`}
      >
        <span
          className="h-8 w-8 bg-[length:100%_100%] bg-center bg-no-repeat"
          style={{ backgroundImage: nextIcon }}
        />
      </button>
    </div>
  )
}

export default Hero
