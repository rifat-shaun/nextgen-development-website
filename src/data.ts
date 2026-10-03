import houseLandExterior from './assets/services/house-and-land-exterior.webp'

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const COMPANY = 'NextGen Building'
export const PHONE = '0470 067 522'
export const EMAIL = 'info@nextgenbuilding.com.au'
export const PERSONAL_EMAIL = 'mhasan2167@mail.com'
export const ADDRESS = '23A Waratah Cr, Macquarie Fields NSW 2564'

export const about = {
  intro:
    'NextGen is a dedicated artisan building company committed to delivering quality craftsmanship while prioritising sustainability. Our mission is to integrate green energy solutions into every project, so that every building we deliver meets the highest standards of quality and contributes positively to the environment.',
  community:
    'Every project we undertake comes with a unique offering: free community library facilities. This commitment is a core part of our values and a prerequisite for project acceptance. We believe that enhancing community resources fosters a sense of belonging and supports lifelong learning.',
  clientCentric:
    'We involve clients in every step of the process, from the initial concept to the final product. This collaborative approach adds value to every project, gives our clients real pride in the result, and ensures their vision is realised with confidence.',
  summary:
    'NextGen is more than just a building company; we are a partner in creating sustainable, community-focused and client-driven projects. Together, we build not just structures, but a better future for our communities.',
}

// Not shown on the site for now (Project menu removed); kept for a future projects page
export const allServices = [
  'House & Land Package',
  'Turnkey Home',
  'Land Sale',
  'Granny Flat',
  'Studio',
  'House Extension',
  'Landscaping',
  'Driveway',
  'Full Renovation',
]

export const projectManagement = ['Residential Project Management', 'Commercial Project Management']

export const projects = [
  'Waratah Cr, Macquarie Fields',
  '104 Cumberland Rd, Ingleburn',
  '85 Cumberland Rd, Ingleburn',
  '21 Hibiscus Cr, Macquarie Fields',
  '11/31 Belmont Rd, Glenfield',
]

export type NavLink = { label: string; href: string }

export const aboutLinks: NavLink[] = [
  { label: 'Our Vision', href: '/about#our-vision' },
  { label: 'Our Mission', href: '/about#our-mission' },
]

export const navItems: (NavLink & { children?: NavLink[] })[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/#services',
    // Built lazily: serviceDetails is declared further down this file
    get children() {
      return serviceDetails.map((service) => ({ label: service.title, href: serviceHref(service.slug) }))
    },
  },
  { label: 'Contact Us', href: '/contact' },
]

export const heroSlides = [
  {
    image: img('1502005229762-cf1b2da7c5d6'),
    title: 'Quality Craftsmanship, Built Sustainably',
    text: 'NextGen Building delivers artisan-quality homes with green energy solutions in every project.',
  },
  {
    image: img('1484154218962-a197022b5858'),
    title: 'Building Better Communities',
    text: 'Every project includes free community library facilities, because great places start with people.',
  },
  {
    image: img('1493809842364-78817add7ffb'),
    title: 'Your Vision, Built Together',
    text: 'From the first concept to the final handover, you are involved in every step of your build.',
  },
]

export const designImages = {
  short: img('1586023492125-27b2c045efd7', 600),
  tall: img('1600210492486-724fe5c67fb0', 600),
}

export const interiorImage = img('1618220179428-22790b461013', 1200)

// The four services shown as cards on the home page
export const services = [
  {
    title: 'House & Land Package',
    slug: 'house-and-land-package',
    image: img('1600596542815-ffad4c1539a9', 700),
    text: 'A complete package pairing the right block with a quality-built home, ready for you to move in.',
  },
  {
    title: 'Turnkey Home',
    slug: 'turnkey-home',
    image: img('1600585154340-be6161a56a0c', 700),
    text: 'Fully finished and ready to live in. Just turn the key and enjoy your new home.',
  },
  {
    title: 'Granny Flat & Studio',
    slug: 'granny-flat',
    image: img('1512917774080-9991f1c4c750', 700),
    text: 'Add living space, rental income or a private studio with a well-crafted secondary dwelling.',
  },
  {
    title: 'Extensions & Renovations',
    slug: 'house-extension',
    image: img('1613490493576-7fde63acd811', 700),
    text: 'From house extensions to full renovations, we transform the home you already have.',
  },
]

export const vision = {
  banner: img('1600585154340-be6161a56a0c'),
  image: img('1600210492486-724fe5c67fb0', 1200),
  statement:
    'Our vision is a future where every home is built to last, powered by clean energy and connected to a thriving community. We want every NextGen project to leave its neighbourhood better than we found it.',
  detail:
    'We see building as more than putting up structures. Each home, extension or development is a chance to raise the standard of craftsmanship, reduce environmental impact and give something back to the people who live nearby.',
  pillars: [
    {
      title: 'Sustainable Living',
      text: 'Homes designed around green energy solutions that lower running costs and protect the environment for the next generation.',
    },
    {
      title: 'Stronger Communities',
      text: 'Free community library facilities with every project, creating shared spaces that encourage belonging and lifelong learning.',
    },
    {
      title: 'Lasting Partnerships',
      text: 'Relationships built on trust and collaboration, so every client feels confident and proud of what we create together.',
    },
  ],
}

export const mission = {
  banner: img('1503387762-592deb58ef4e'),
  image: img('1586023492125-27b2c045efd7', 900),
  statement:
    'Our mission is to deliver quality craftsmanship while integrating green energy solutions into every project, so that each building meets the highest standards of quality and contributes positively to the environment.',
  detail:
    'We achieve this by combining skilled trades, careful project management and genuine collaboration with our clients, from the initial concept to the final handover.',
  commitments: [
    {
      title: 'Quality Craftsmanship',
      text: 'Every project is delivered with artisan care, premium materials and attention to detail at each stage of construction.',
    },
    {
      title: 'Green Energy in Every Build',
      text: 'We integrate sustainable, energy-efficient solutions into all of our projects as standard, not as an optional extra.',
    },
    {
      title: 'Free Community Libraries',
      text: 'Each project includes free community library facilities. This is a core part of our values and a prerequisite for project acceptance.',
    },
    {
      title: 'Clients at Every Step',
      text: 'You are involved from the initial concept to the final product, so your vision is realised exactly as you imagined.',
    },
  ],
}

// Client reviews shown on the home page.
// These are SAMPLE reviews written to preview the design. They are NOT from real
// clients, so they only appear in development (`npm run dev`) and are hidden in
// the production build. Replace each with a genuine review (with the client's
// permission) and set `sample: false` to publish it.
export const reviews = [
  {
    name: 'Sarah M.',
    project: 'House & Land Package, Macquarie Fields',
    rating: 5,
    text: 'From choosing the block to getting the keys, the team kept us informed every step of the way. The finish is excellent and the solar setup has already cut our power bills.',
    sample: true,
  },
  {
    name: 'Daniel K.',
    project: 'Granny Flat, Ingleburn',
    rating: 5,
    text: 'We wanted a granny flat for my parents and NextGen made it easy. They handled the approvals, stuck to the timeline and the build quality is better than we expected.',
    sample: true,
  },
  {
    name: 'Priya & Raj S.',
    project: 'Full Renovation, Glenfield',
    rating: 5,
    text: 'Our renovation had a lot of moving parts, but communication never dropped. We were involved in every decision and the result feels like a brand new home.',
    sample: true,
  },
  {
    name: 'Michael T.',
    project: 'House Extension, Campbelltown',
    rating: 5,
    text: 'Professional, tidy and genuinely easy to deal with. The extension blends in perfectly with the original house and was finished right on schedule.',
    sample: true,
  },
  {
    name: 'Emma L.',
    project: 'Turnkey Home, Leppington',
    rating: 5,
    text: 'We moved straight in without lifting a finger. Every detail was thought through, and the community library commitment was a lovely touch that won us over.',
    sample: true,
  },
]

export type ServiceDetail = {
  slug: string
  title: string
  category: 'Building services' | 'Project management'
  images: string[]
  // First paragraph; the service title is shown in bold wherever it appears
  intro: string
  listIntro: string
  list: string[]
  closing: string
}

// Content for each service page (/services/:slug)
export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'house-and-land-package',
    title: 'House & Land Package',
    category: 'Building services',
    images: [houseLandExterior, img('1600585154340-be6161a56a0c'), img('1600566753190-17f0baa2a6c3')],
    intro:
      'Want to build without juggling a land purchase and a builder separately? A House & Land Package brings the right block and a quality-built home together in one simple process.',
    listIntro: 'We help you find suitable land and design a home that fits it, making our packages a great choice for:',
    list: [
      'First-home buyers who want a clear, all-in-one price',
      'Investors looking for a new, low-maintenance property',
      'Families moving into growing communities',
    ],
    closing:
      'Every package includes energy-efficient design, quality inclusions and one team managing the build from approvals to handover.',
  },
  {
    slug: 'turnkey-home',
    title: 'Turnkey Home',
    category: 'Building services',
    images: [img('1600607687939-ce8a6c25118c'), img('1600210492486-724fe5c67fb0'), img('1484154218962-a197022b5858')],
    intro:
      'A Turnkey Home is finished down to the last detail, so all you need to do is unlock the door and move in.',
    listIntro: 'Everything is completed before handover, including:',
    list: [
      'Flooring, window coverings and light fittings',
      'Kitchen, bathroom and laundry fixtures',
      'Landscaping, fencing and driveway',
    ],
    closing:
      'It is the simplest way to own a brand new home, with no extra trades to organise once the build is done.',
  },
  {
    slug: 'land-sale',
    title: 'Land Sale',
    category: 'Building services',
    images: [img('1558904541-efa843a96f01'), img('1541888946425-d81bb19240f5'), img('1600585154340-be6161a56a0c')],
    intro:
      'Choosing the right block is the first step to a great home. Through our Land Sale service, we offer land that is ready to build on, backed by a builder’s advice.',
    listIntro: 'Before you buy, we walk you through what each block means for your future home:',
    list: [
      'Orientation, slope and soil conditions',
      'Access to services such as water, sewer and power',
      'Council and zoning requirements',
    ],
    closing: 'You can buy the land on its own or bundle it with one of our house and land packages.',
  },
  {
    slug: 'granny-flat',
    title: 'Granny Flat',
    category: 'Building services',
    images: [img('1512917774080-9991f1c4c750'), img('1564013799919-ab600027ffc6'), img('1600607687939-ce8a6c25118c')],
    intro:
      'A Granny Flat adds valuable living space to your property, built to the same standard as a new home.',
    listIntro: 'Our secondary dwellings are designed to suit your block and are ideal for:',
    list: [
      'Ageing parents who want to stay close to family',
      'Grown-up children wanting their own space',
      'Homeowners looking for extra rental income',
    ],
    closing:
      'We handle the design, approvals and construction, with energy-efficient features that keep running costs low.',
  },
  {
    slug: 'studio',
    title: 'Studio',
    category: 'Building services',
    images: [img('1581858726788-75bc0f6a952d'), img('1586023492125-27b2c045efd7'), img('1555041469-a586c61ea9bc')],
    intro:
      'Need a quiet place to work or create? A backyard Studio gives you a dedicated space just steps from your home.',
    listIntro: 'Our studios are insulated, naturally lit and fully powered, making them perfect as:',
    list: ['A home office away from household noise', 'A creative studio or music room', 'A home gym or personal retreat'],
    closing: 'Each studio is designed to suit your backyard and budget, without the cost of a full extension.',
  },
  {
    slug: 'house-extension',
    title: 'House Extension',
    category: 'Building services',
    images: [img('1600566753190-17f0baa2a6c3'), img('1600047509807-ba8f99d2cdde'), img('1600596542815-ffad4c1539a9')],
    intro:
      'Love where you live but need more room? A House Extension gives your family extra space without the cost and stress of moving.',
    listIntro: 'We design and build extensions that blend seamlessly with your home, including:',
    list: ['Ground-floor living areas and bedrooms', 'First-floor additions', 'Larger kitchens and open-plan spaces'],
    closing:
      'Our team manages the site carefully while you live at home, keeping disruption to a minimum from start to finish.',
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    category: 'Building services',
    images: [img('1564013799919-ab600027ffc6'), img('1558904541-efa843a96f01'), img('1600585154340-be6161a56a0c')],
    intro:
      'Great Landscaping turns your yard into a space you will actually use, and completes the look of your home.',
    listIntro: 'We design and build practical, low-maintenance outdoor areas, including:',
    list: ['Gardens, lawns and planting', 'Paving, pathways and retaining walls', 'Outdoor entertaining areas'],
    closing: 'We choose plants and materials suited to local conditions, so your garden looks good all year round.',
  },
  {
    slug: 'driveway',
    title: 'Driveway',
    category: 'Building services',
    images: [img('1600047509807-ba8f99d2cdde'), img('1600566753190-17f0baa2a6c3'), img('1600585154340-be6161a56a0c')],
    intro:
      'Your Driveway is the first thing visitors see and takes wear every day, so it needs to look good and last.',
    listIntro: 'We build new driveways and replace old ones in a range of finishes:',
    list: ['Plain and coloured concrete', 'Exposed aggregate', 'Pavers'],
    closing:
      'Every driveway starts with proper base preparation and drainage, and we take care of council crossover requirements.',
  },
  {
    slug: 'full-renovation',
    title: 'Full Renovation',
    category: 'Building services',
    images: [img('1484154218962-a197022b5858'), img('1600210492486-724fe5c67fb0'), img('1502005229762-cf1b2da7c5d6')],
    intro:
      'A Full Renovation gives your existing home a complete fresh start, without the need to move.',
    listIntro: 'We plan every stage with you and can transform:',
    list: ['Kitchens, bathrooms and laundries', 'Living areas and floor plans', 'Finishes, fixtures and energy efficiency'],
    closing: 'You will know the scope, schedule and price upfront, and be involved in every key decision along the way.',
  },
  {
    slug: 'residential-project-management',
    title: 'Residential Project Management',
    category: 'Project management',
    images: [img('1503387762-592deb58ef4e'), img('1541888946425-d81bb19240f5'), img('1600596542815-ffad4c1539a9')],
    intro:
      'Building or renovating involves many trades, approvals and decisions. Our Residential Project Management service puts an experienced team in charge of it all.',
    listIntro: 'We look after every part of your project, including:',
    list: ['Planning, scheduling and budgeting', 'Coordinating trades and suppliers', 'Quality control and compliance'],
    closing: 'You receive regular progress updates, so you always know where your project stands.',
  },
  {
    slug: 'commercial-project-management',
    title: 'Commercial Project Management',
    category: 'Project management',
    images: [img('1541888946425-d81bb19240f5'), img('1503387762-592deb58ef4e'), img('1600047509807-ba8f99d2cdde')],
    intro:
      'Commercial projects demand tight coordination and clear reporting. Our Commercial Project Management service keeps your build on time and on budget.',
    listIntro: 'From feasibility to completion, we manage:',
    list: [
      'Contractors, consultants and suppliers',
      'Programme, cost and risk',
      'Work health and safety compliance',
    ],
    closing: 'Stakeholders receive transparent reporting at every stage, with a high standard of workmanship throughout.',
  },
]

export const serviceHref = (slug: string) => `/services/${slug}`
