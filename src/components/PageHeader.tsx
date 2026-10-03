import { Link } from 'react-router-dom'

type Props = {
  title: string
  image: string
  trail: string[]
}

// Banner at the top of inner pages: background photo, title and breadcrumb
function PageHeader({ title, image, trail }: Props) {
  return (
    <section
      className="relative flex min-h-[200px] items-center bg-cover bg-center py-12 md:min-h-[280px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      <div className="container-bs relative">
        <h1 className="!text-white">{title}</h1>
        <nav aria-label="Breadcrumb" className="text-[0.95rem] text-white/80">
          <Link to="/" className="text-white/80 transition-colors hover:text-accent">
            Home
          </Link>
          {trail.map((crumb, i) => (
            <span key={crumb}>
              <span className="mx-2">/</span>
              <span className={i === trail.length - 1 ? 'text-accent' : ''}>{crumb}</span>
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default PageHeader
