import { useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { FaBed, FaCar } from 'react-icons/fa'
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiDroplet, FiHome, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import ProjectMap from '../components/ProjectMap'
import { PHONES, projectHref, projects, telHref } from '../data'

// Icon for each kind of fact in the features row; anything else gets a house
const featureIcons: Record<string, IconType> = {
  bedrooms: FaBed,
  bathrooms: FiDroplet,
  'car spaces': FaCar,
}

// Height of the solid navbar, which this page shows from the top
const NAV = 'pt-[52px]'

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)

  // Swipe left/right on touch screens
  const touchX = useRef<number | null>(null)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const arrow =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-3xl text-white transition-colors hover:bg-black/50'

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-[#e9ecef] lg:aspect-[16/8]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt}, photo ${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className="h-full w-full shrink-0 object-cover"
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-4`}>
            <FiChevronLeft />
          </button>
          <button onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-4`}>
            <FiChevronRight />
          </button>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/projects" replace />

  const enquireHref = `/contact?${new URLSearchParams({ project: `${project.title}, ${project.address}` })}`
  const others = projects.filter((p) => p.slug !== project.slug)

  return (
    <div className={`${NAV} flex flex-col lg:grid lg:grid-cols-2`}>
      {/* Map: below the details on phones, a sticky left half on desktop */}
      <div className="order-2 lg:order-1">
        <ProjectMap
          location={project.location}
          label={project.address}
          street={project.address.split(',')[0]}
          suburb={project.suburb}
          image={project.images[0]}
          className="h-[320px] w-full sm:h-[400px] lg:sticky lg:top-[52px] lg:h-[calc(100svh-52px)]"
        />
      </div>

      <div className="order-1 lg:order-2">
        <Gallery key={project.slug} images={project.images} alt={`${project.title} at ${project.address}`} />

        <section className="flex flex-col gap-8 px-5 py-6 sm:px-6 md:flex-row md:items-start xl:px-8">
          <div className="min-w-0 flex-1">
            <Link
              to="/projects"
              className="mb-3 inline-flex items-center gap-1.5 text-sm text-[#6c757d] transition-colors hover:text-accent"
            >
              <FiArrowLeft /> All projects
            </Link>
            <h1 className="mb-1 !text-[1.5rem] !font-light leading-snug !text-body md:!text-[1.65rem]">
              {project.title}
            </h1>
            <p className="mb-4 flex items-center gap-1.5 text-[0.95rem] text-[#6c757d]">
              <FiMapPin className="shrink-0" /> {project.address}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[1.4rem] font-light text-body">Contact for details</span>
              {project.status && (
                <span className="rounded-[2px] bg-accent px-2 py-0.5 text-[0.7rem] font-medium tracking-wide text-white uppercase">
                  {project.status}
                </span>
              )}
            </div>
            <p className="mt-1 mb-6 text-[0.75rem] tracking-wider text-[#6c757d] uppercase">{project.type}</p>

            {project.features && project.features.length > 0 && (
              // Cells overlap by 1px so neighbouring borders merge into one line
              <ul className="grid grid-cols-2 pl-px pt-px sm:grid-cols-3">
                {project.features.map(({ label, value }) => {
                  const Icon = featureIcons[label.toLowerCase()] ?? FiHome
                  return (
                    <li
                      key={label}
                      className="-ml-px -mt-px flex flex-col items-center gap-2 border border-[#dee2e6] px-3 py-5 text-center text-[0.95rem] text-body"
                    >
                      <Icon aria-hidden className="text-2xl text-[#3d3d4a]" />
                      {value} {label}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Who to talk to about this project */}
          <aside className="flex flex-col items-center text-center md:w-64 md:shrink-0">
            <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-dropdown shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              <span className="font-heading text-[0.95rem] font-semibold tracking-[0.12em] text-white">NEXTGEN</span>
            </div>
            <p className="m-0 font-medium text-body">The NextGen Team</p>
            {PHONES.map((phone) => (
              <a
                key={phone}
                href={telHref(phone)}
                className="flex items-center gap-1.5 text-[0.95rem] text-body transition-colors hover:text-accent"
              >
                <FiPhone className="text-xs" /> {phone}
              </a>
            ))}
            <Link
              to={enquireHref}
              className="mt-4 block w-full rounded-full bg-accent px-6 py-3 text-[0.95rem] font-medium text-white transition-colors hover:bg-[#e65c00]"
            >
              Enquire About This Project
            </Link>
          </aside>
        </section>

        <section className="bg-[#f4f4f4] px-5 py-8 sm:px-6 xl:px-8">
          <h2 className="mb-4 !text-[1.1rem] !font-normal !text-body">Description</h2>
          {project.description.map((paragraph) => (
            <p key={paragraph} className="text-[0.95rem] leading-[1.7] text-[#444]">
              {paragraph}
            </p>
          ))}
        </section>

        {others.length > 0 && (
          <section className="px-5 py-8 sm:px-6 xl:px-8">
            <h2 className="mb-4 !text-[1.1rem] !font-normal !text-body">Other Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} to={projectHref(p.slug)} className="group flex items-center gap-4">
                  <img
                    src={p.images[0]}
                    alt=""
                    loading="lazy"
                    className="h-20 w-28 shrink-0 rounded-[4px] object-cover transition-opacity group-hover:opacity-85"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-medium text-body group-hover:text-accent">{p.title}</span>
                    <span className="block truncate text-sm text-[#6c757d]">{p.address}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
