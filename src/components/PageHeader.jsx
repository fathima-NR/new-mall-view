import { Link } from '../router'
import Img from './Img'

// Banner at the top of inner pages (Menu, About, Gallery, Contact).
export default function PageHeader({ eyebrow, title, sub, image, crumb }) {
  return (
    <section className="page-hero">
      <div className="hero-pattern" aria-hidden="true" />
      {image && (
        <div className="page-hero-img" aria-hidden="true">
          <Img name={image} alt="" eager />
        </div>
      )}
      <div className="container page-hero-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb || title}</span>
        </nav>
        {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
    </section>
  )
}
