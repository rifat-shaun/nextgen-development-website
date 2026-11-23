import { useEffect, useState, type FormEvent } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { allServices, heroSlides, projectManagement } from '../data'
import Select, { type OptionGroup } from './Select'

const ALL = 'All services'
const serviceGroups: OptionGroup[] = [
  { label: 'Any', options: [ALL] },
  { label: 'Real estate services', options: allServices },
  { label: 'Project management', options: projectManagement },
]

function Hero() {
  const [index, setIndex] = useState(0)
  const [service, setService] = useState(ALL)
  const [suburb, setSuburb] = useState('')
  const navigate = useNavigate()
  const count = heroSlides.length

  // Slowly cross-fade between the background photos
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(timer)
  }, [index, count])

  // The bar hands the choice to the contact form, which pre-fills from the query
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (service !== ALL) params.set('service', service)
    if (suburb.trim()) params.set('suburb', suburb.trim())
    const query = params.toString()
    navigate(`/contact${query ? `?${query}` : ''}`)
  }

  const slide = heroSlides[index]

  return (
    <section className="relative">
      <div className="relative flex h-[38rem] flex-col bg-dropdown sm:h-[40rem] min-[1395px]:h-[48rem]">
        {heroSlides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Darken the photo so the text and bar stay readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />

        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-24 text-center lg:pt-32">
          <div key={index} className="max-w-[760px] animate-[heroFade_900ms_ease-out]">
            <h1 className="mb-4 !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">{slide.title}</h1>
            <p className="mx-auto m-0 max-w-[600px] text-white/85 sm:text-lg sm:leading-[1.5]">{slide.text}</p>
          </div>
        </div>

        {/* Search strip along the bottom of the photo */}
        <div className="relative z-10 bg-black/60 px-4 py-5 backdrop-blur-[2px]">
          <form
            onSubmit={onSubmit}
            className="mx-auto flex max-w-[880px] flex-col gap-2 sm:flex-row sm:gap-0"
            aria-label="Find a service"
          >
            <div className="sm:w-56 sm:shrink-0">
              <span id="hero-service-label" className="sr-only">
                Service
              </span>
              <Select
                id="hero-service"
                value={service}
                onChange={setService}
                groups={serviceGroups}
                describedBy="hero-service-label"
                dark
                className="h-12 w-full bg-[#1f1f1f] px-4 text-[0.95rem] focus:outline-none"
              />
            </div>

            <label className="flex-1 sm:border-l sm:border-white/10">
              <span className="sr-only">Suburb or address</span>
              <input
                type="text"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Enter your suburb or project address"
                className="h-12 w-full bg-[#1f1f1f] px-4 text-[0.95rem] text-white placeholder:text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              />
            </label>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 whitespace-nowrap bg-accent px-8 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#e65c00]"
            >
              <FiSearch />
              Enquire
            </button>
          </form>
        </div>
      </div>

      {/* Navy band under the photo, holding the slide indicators */}
      <div className="flex h-[70px] items-center justify-center gap-2 bg-dropdown">
        {heroSlides.map((s, i) => (
          <button
            key={s.image}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === index ? 'w-10 bg-accent' : 'w-6 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
