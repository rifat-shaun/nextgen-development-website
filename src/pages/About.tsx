import type { IconType } from 'react-icons'
import { FaHandshake, FaLeaf, FaUsers } from 'react-icons/fa'
import CallToAction from '../components/CallToAction'
import PageHeader from '../components/PageHeader'
import { about, mission, vision } from '../data'

const pillarIcons: IconType[] = [FaLeaf, FaUsers, FaHandshake]

// Offset anchor targets so the sticky navbar doesn't cover them
const anchor = 'scroll-mt-16'

function SectionTitle({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mx-auto mb-12 max-w-[640px] text-center">
      <h2 className="!text-[2rem] md:!text-[2.5rem]">{title}</h2>
      <span className="mx-auto mb-5 mt-4 block h-[3px] w-16 rounded-full bg-accent" />
      <p className="m-0 text-base leading-[1.6] text-[#666]">{intro}</p>
    </div>
  )
}

function About() {
  return (
    <>
      <PageHeader title="About Us" image={vision.banner} trail={['About Us']} />

      {/* Who we are */}
      <section className="bg-mint py-[60px]">
        <div className="container-bs">
          <div className="reveal mx-auto max-w-[820px] text-center">
            <h2>Who We Are</h2>
            <p className="text-[1.1rem] leading-[1.7]">{about.intro}</p>
            <p className="m-0 leading-[1.7] text-[#6c757d]">{about.summary}</p>
          </div>
        </div>
      </section>

      {/* Our Vision: image with overlapping card, as on the home page */}
      <section id="our-vision" className={`${anchor} bg-[#f8f9fa] py-[60px]`}>
        <div className="container-bs">
          <div className="reveal -mx-3 flex flex-wrap items-center">
            <div className="w-full px-3 lg:w-1/2">
              <div className="relative h-[300px] overflow-hidden rounded-[20px] md:h-[400px]">
                <img src={vision.image} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="w-full px-3 lg:w-1/2">
              <div className="relative z-[2] mt-[30px] rounded-[20px] bg-white px-[25px] py-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:px-[30px] md:py-10 lg:-ml-[50px] lg:mt-0 lg:px-10 lg:py-[50px]">
                <h2 className="mb-[30px] !text-[1.8rem] md:!text-[2rem]">Our Vision</h2>
                <p className="text-base leading-[1.6] text-[#6c757d] md:text-[1.1rem]">
                  {vision.statement}
                </p>
                <p className="m-0 text-base leading-[1.6] text-[#6c757d]">{vision.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision pillars */}
      <section className="bg-mint py-[60px] md:py-20">
        <div className="container-bs">
          <SectionTitle
            title="WHAT OUR VISION MEANS"
            intro="Three principles guide every home, extension and development we consult on."
          />
          <div className="reveal grid gap-6 md:grid-cols-3">
            {vision.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i]
              return (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 lg:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(0,76,145,0.15)]"
                >
                  <span className="pointer-events-none absolute right-6 top-4 font-heading text-6xl font-bold text-brand/[0.07] transition-colors duration-300 group-hover:text-accent/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-[1.75rem] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon />
                  </div>
                  <h3 className="mb-3 !text-[1.4rem]">{pillar.title}</h3>
                  <p className="m-0 text-[0.95rem] leading-[1.7] text-[#666]">{pillar.text}</p>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Mission: text beside image */}
      <section id="our-mission" className={`${anchor} bg-[#f8f9fa] py-[60px]`}>
        <div className="container-bs">
          <div className="-mx-3 flex flex-wrap items-center">
            <div className="reveal w-full px-3 lg:w-1/2 lg:pr-10">
              <h2>Our Mission</h2>
              <p className="text-[1.1rem] leading-[1.6]">{mission.statement}</p>
              <p className="m-0 text-[#6c757d]">{mission.detail}</p>
            </div>
            <div className="reveal mt-6 w-full px-3 lg:mt-0 lg:w-1/2">
              <img
                src={mission.image}
                alt=""
                className="h-[300px] w-full rounded-[20px] object-cover md:h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission commitments */}
      <section className="bg-mint py-[60px] md:py-20">
        <div className="container-bs">
          <SectionTitle
            title="HOW WE DELIVER"
            intro="Four commitments we bring to every project, big or small."
          />
          <div className="reveal grid gap-6 md:grid-cols-2">
            {mission.commitments.map((item, i) => (
              <div
                key={item.title}
                className="group relative flex gap-4 overflow-hidden rounded-2xl bg-white p-6 lg:gap-5 lg:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(0,76,145,0.15)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 font-heading text-lg font-semibold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-2 !text-[1.4rem]">{item.title}</h3>
                  <p className="m-0 text-[0.95rem] leading-[1.7] text-[#666]">{item.text}</p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        className="bg-[#f8f9fa]"
        title="Let's Build a Better Future Together"
        text="Get in touch for a free consultation with the NextGen team."
      />
    </>
  )
}

export default About
