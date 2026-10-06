# NextGen Real Estate & Development Consultant – Website

Marketing website for **NextGen Real Estate & Development Consultant** (short form: NextGen Reality & Consultant), a real estate and development consultancy in South West Sydney that guides clients towards quality craftsmanship, green energy solutions and free community library facilities in every project.

Built with React, TypeScript, Vite and Tailwind CSS. The layout and styling follow a Bootstrap-style design system (container widths, spacing and type scale) recreated in Tailwind.

## Tech stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) + TypeScript | UI |
| [Vite](https://vite.dev) | Dev server and build |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling (via `@tailwindcss/vite`) |
| [React Router](https://reactrouter.com) | Page routing |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons |
| [Web3Forms](https://web3forms.com) | Contact form email delivery (no backend needed) |

## Getting started

Requires **Node.js 20+**.

```bash
npm install
cp .env.example .env   # then add your Web3Forms key (see below)
npm run dev            # http://localhost:5173
```

To open the site on your phone while developing, run `npm run dev -- --host` and visit the network URL it prints (phone and computer must be on the same Wi-Fi).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Yes, for the contact form | Access key from [web3forms.com](https://web3forms.com). Submissions are emailed to the address you registered the key with. |

`.env` is git-ignored. Restart the dev server after changing it. Web3Forms keys are designed to be public, so it is fine that the key ends up in the built JavaScript.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with Oxlint |

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero slideshow, about intro, community commitment, services, client reviews |
| `/about` | About Us: who we are, vision (`#our-vision`) and mission (`#our-mission`) |
| `/services/:slug` | One page per service, e.g. `/services/house-and-land-package` |
| `/contact` | Contact details and enquiry form. `?service=<name>` pre-selects a service |

`/about/our-vision` and `/about/our-mission` redirect to the matching section of `/about`. Unknown service slugs redirect to the services section on the home page.

## Project structure

```
src/
├── data.ts              # All site content: contact details, nav, slides, services, reviews
├── App.tsx              # Routes, scroll-to-top/anchor handling, scroll reveal
├── main.tsx             # Entry point (BrowserRouter)
├── index.css            # Theme colours, base typography, shared utilities
├── useReveal.ts         # Fade-in-on-scroll for elements with the `reveal` class
├── assets/              # Logo and local images
├── components/
│   ├── Navbar.tsx       # Sticky header, desktop dropdowns, mobile menu
│   ├── Hero.tsx         # Home page slideshow (auto-play, arrows, swipe)
│   ├── DesignSection.tsx, InteriorSection.tsx, ServicesSection.tsx, ReviewsSection.tsx
│   ├── PageHeader.tsx   # Banner + breadcrumb for inner pages
│   ├── CallToAction.tsx # Blue "get in touch" band
│   ├── Select.tsx       # Accessible custom dropdown used in the contact form
│   ├── Logo.tsx         # Navbar emblem and full footer logo
│   └── Footer.tsx
└── pages/
    ├── Home.tsx, About.tsx, Contact.tsx
    └── ServicePage.tsx  # Template shared by every service page
```

## Editing content

Almost everything you'd want to change lives in **`src/data.ts`**:

- **Contact details**: `PHONE`, `EMAIL`, `PERSONAL_EMAIL`, `ADDRESS`
- **About text**: `about`, `vision`, `mission`
- **Hero slides**: `heroSlides`
- **Home page service cards**: `services`
- **Service pages**: `serviceDetails`. Add an entry here and the page, menu link and route are created automatically
- **Contact form service list**: `allServices` and `projectManagement`

Theme colours (brand blue, accent orange and so on) are defined in the `@theme` block at the top of `src/index.css`.

### Images

Most photos are loaded from [Unsplash](https://unsplash.com) via the `img()` helper in `data.ts`. To use your own photo, put it in `src/assets/`, import it at the top of `data.ts`, and use the import instead of `img(...)`. See the House & Land Package gallery for an example.

### Client reviews

The reviews in `data.ts` are **sample placeholders** marked `sample: true`. They only appear during development and are hidden automatically in the production build. To publish a real review, replace the text with the client's own words (with their permission) and set `sample: false`.

### Social media icons

The footer social icons are hidden for now. Set `SHOW_SOCIALS = true` at the top of `src/components/Footer.tsx` and add the real profile URLs to re-enable them.

## Deployment

`npm run build` produces a static site in `dist/` that can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, etc.).

Two things to set up on the host:

1. **Environment variable**: add `VITE_WEB3FORMS_KEY` in the host's settings, since `.env` is not uploaded.
2. **SPA fallback**: the site uses client-side routing, so all paths must serve `index.html`. Otherwise opening a link like `/about` directly gives a 404.
   - **Netlify**: create `public/_redirects` containing `/*  /index.html  200`
   - **Vercel**: create `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
