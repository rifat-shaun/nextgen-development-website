import { FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { about, PHONE, serviceHref, services } from '../data'

function ServicesSection() {
  return (
    <section id="services" className="bg-mint py-[60px]">
      <div className="container-bs">
        <div className="-mx-3 flex flex-wrap">
          <div className="reveal mx-auto w-full max-w-[744px] px-3 xl:mx-0 xl:w-1/2 xl:max-w-none">
            <h2 className="mb-[60px] text-center !text-[2rem] md:!text-[2.5rem]">
              OUR SERVICES
            </h2>

            <div className="mx-auto mb-12 max-w-[600px] text-base leading-[1.6] text-[#666] xl:mx-0">
              <p>
                From house and land packages and turnkey homes to land sales, granny flats, studios,
                extensions, landscaping, driveways and full renovations, we guide you through every
                type of residential project, connecting you with the right people and the right pathway.
              </p>
              <p>
                We manage all sorts of real estate services and needs, including residential and
                commercial project management, to achieve the best real estate solution for you.{' '}
                {about.clientCentric}
              </p>
            </div>

            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="flex flex-col justify-center rounded-lg bg-brand p-8 text-center text-white"
            >
              <div className="mb-4 text-[2rem] opacity-90">
                <FaPhoneAlt className="mx-auto" />
              </div>
              <div className="mb-2 text-2xl font-medium">{PHONE}</div>
              <p className="m-0 text-[0.95rem] opacity-90">Call us today for a free consultation</p>
            </a>
          </div>

          <div className="reveal mt-8 w-full px-3 xl:mt-0 xl:w-1/2">
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group mb-8 h-full overflow-hidden rounded-lg bg-white shadow-[0_2px_15px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] md:mb-0"
                >
                  <Link to={serviceHref(service.slug)} className="no-underline">
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-[#004c9175]">
                        <h3 className="m-0 text-center !text-2xl !font-medium !text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="m-0 line-clamp-2 text-[0.95rem] leading-[1.6] text-[#666]">
                        {service.text}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
