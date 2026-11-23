import { Link } from 'react-router-dom'
import { projectHref, projects } from '../data'

const featured = projects.slice(0, 6)

function FeaturedProperties() {
  return (
    <section id="featured-properties" className="bg-white py-[60px] md:py-20">
      <div className="container-bs">
        <h2 className="reveal mb-10 text-center !text-[2rem] !font-light !text-body md:!text-[2.25rem]">
          Featured Properties
        </h2>

        <div className="reveal flex flex-wrap justify-center gap-5">
          {featured.map((project) => {
            // The state is implied, so drop it to keep the address on one line
            const label = project.address.replace(/,?\s*NSW$/, '')
            return (
              <Link
                key={project.slug}
                to={projectHref(project.slug)}
                aria-label={`${project.title} at ${project.address}`}
                className="group relative block aspect-[16/9] w-full overflow-hidden rounded-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.12)] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <img
                  src={project.images[0]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/60" />

                <div className="relative flex h-full flex-col items-center px-6 pt-4 text-center text-white">
                  {project.status && (
                    <span className="mb-4 rounded-[2px] bg-accent px-2 py-0.5 text-[0.7rem] font-medium tracking-wide uppercase">
                      {project.status}
                    </span>
                  )}
                  <span className={`text-xl font-light sm:text-[1.4rem] ${project.status ? '' : 'mt-10'}`}>
                    {project.title}
                  </span>
                  <span className="my-3 h-px w-1/2 bg-white/70" />
                  <span className="w-full truncate text-lg font-light sm:text-xl" title={label}>
                    {label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/projects"
            className="inline-block rounded-[2px] bg-dropdown px-5 py-2.5 text-[0.9rem] text-white transition-colors hover:bg-brand"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
