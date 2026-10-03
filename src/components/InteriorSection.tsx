import { about, interiorImage } from '../data'

function InteriorSection() {
  return (
    <section className="bg-[#f8f9fa] py-[60px] lg:py-10">
      <div className="container-bs">
        <div className="reveal -mx-3 flex flex-wrap items-center">
          <div className="w-full px-3 lg:w-1/2">
            <div className="relative h-[300px] overflow-hidden rounded-[20px] md:h-[400px]">
              <img
                src={interiorImage}
                alt="Modern living room interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="w-full px-3 lg:w-1/2">
            <div className="relative z-[2] mt-[30px] rounded-[20px] bg-white px-[25px] py-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:px-[30px] md:py-10 lg:-ml-[50px] lg:mt-0 lg:px-10 lg:py-[50px]">
              <h2 className="mb-[30px] !text-[1.8rem] !leading-[1.2] md:!text-[2rem]">
                Community Commitment
              </h2>
              <div>
                <p className="m-0 text-base leading-[1.6] text-[#6c757d] md:text-[1.1rem]">
                  {about.community}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteriorSection
