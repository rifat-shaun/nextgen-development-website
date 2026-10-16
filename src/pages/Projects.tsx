import { FiMapPin } from 'react-icons/fi'
import CallToAction from '../components/CallToAction'
import PageHeader from '../components/PageHeader'
import { projects, vision } from '../data'

function Projects() {
  return (
    <>
      <PageHeader title="Our Projects" image={vision.banner} trail={['Projects']} />

      <section className="bg-mint py-[60px] md:py-20">
        <div className="container-bs">
          <div className="reveal mx-auto mb-12 max-w-[640px] text-center">
            <h2 className="!text-[2rem] md:!text-[2.5rem]">Current &amp; Recent Work</h2>
            <span className="mx-auto mb-5 mt-4 block h-[3px] w-16 rounded-full bg-accent" />
            <p className="m-0 text-base leading-[1.6] text-[#666]">
              A look at the homes and developments we are guiding from concept to completion.
            </p>
          </div>

          {/* Centered so a short list doesn't sit off to one side */}
          <div className="reveal flex flex-wrap justify-center gap-6">
            {projects.map((project) => (
              <article
                key={project.image}
                className="group w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(0,76,145,0.15)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.address ? `${project.title} at ${project.address}` : project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.status && (
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-medium text-white">
                      {project.status}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 !text-[1.4rem]">{project.title}</h3>
                  {project.address && (
                    <p className="mb-3 flex items-center gap-2 text-[0.95rem] font-medium text-brand">
                      <FiMapPin className="shrink-0" />
                      {project.address}
                    </p>
                  )}
                  <p className="m-0 text-[0.95rem] leading-[1.7] text-[#666]">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        className="bg-[#f8f9fa]"
        title="Planning Your Next Project?"
        text="Get in touch for a free consultation with the NextGen team."
      />
    </>
  )
}

export default Projects
