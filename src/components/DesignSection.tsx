import { about, designImages } from '../data'

function DesignSection() {
  return (
    <div id="about" className="bg-mint py-[35px]">
      <div className="container-bs">
        <div className="-mx-3 flex flex-wrap">
          <div className="reveal flex w-full flex-col justify-center px-3 lg:w-1/2">
            <h2>Artisan Craftsmanship, Built Sustainably</h2>
            <div>
              <p>{about.intro}</p>
            </div>
          </div>
          <div className="reveal mt-6 w-full px-3 lg:mt-0 lg:w-1/2">
            <div className="-mx-1.5 flex items-end sm:-mx-3">
              <div className="w-1/2 px-1.5 sm:px-3">
                <img
                  src={designImages.short}
                  alt="Living room armchair"
                  className="aspect-[4/5] h-auto max-w-full rounded-[15px] object-cover"
                />
              </div>
              <div className="w-1/2 px-1.5 sm:px-3">
                <img
                  src={designImages.tall}
                  alt="Open plan living room"
                  className="aspect-[2/3] h-auto max-w-full rounded-[15px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignSection
