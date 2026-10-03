import { useState, type ReactNode } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { serviceDetails } from '../data'

// Show every occurrence of the service title in bold
function withBoldTitle(text: string, title: string): ReactNode[] {
  return text.split(title).flatMap((part, i) =>
    i === 0 ? [part] : [<strong key={i} className="font-bold text-body">{title}</strong>, part],
  )
}

const arrow =
  'absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-xl text-white opacity-80 backdrop-blur-sm transition hover:bg-black/45 hover:opacity-100'

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title} – photo ${index + 1} of ${count}`}
          className="caption-fade aspect-[2/1] w-full object-cover"
        />
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-3`}>
              <BsChevronLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-3`}>
              <BsChevronRight />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`w-[22%] overflow-hidden rounded-md transition ${
                i === index ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={src.replace('w=1600', 'w=300')} alt="" className="aspect-[3/2] w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ServicePage() {
  const { slug } = useParams()
  const service = serviceDetails.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/#services" replace />

  return (
    <>
      <PageHeader title={service.title} image={service.images[0]} trail={['Services', service.title]} />

      <section className="bg-white py-10 md:py-14">
        <div className="container-bs">
          <div className="-mx-3 flex flex-wrap">
            <div className="reveal w-full px-3 lg:w-1/2">
              {/* key resets the gallery when moving between service pages */}
              <Gallery key={service.slug} images={service.images} title={service.title} />
            </div>

            <div className="reveal mt-8 w-full px-3 lg:mt-0 lg:w-1/2">
              <h2 className="mb-6">{service.title}</h2>
              <div className="text-[0.95rem] leading-[1.6] text-[#444]">
                <p>{withBoldTitle(service.intro, service.title)}</p>
                <p>{service.listIntro}</p>
                <ul className="mb-4 list-disc space-y-1 pl-7">
                  {service.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="m-0">{service.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicePage
