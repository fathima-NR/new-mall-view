import Hero from '../components/Hero'
import CuisineStrip from '../components/CuisineStrip'
import Signature from '../components/Signature'
import Img from '../components/Img'
import { GalleryCard } from '../components/Gallery'
import { galleryItems } from '../data/gallery'
import { IconArrow, IconPhone, IconWhatsApp } from '../components/Icons'
import { groups, menu } from '../data/menu'
import { restaurant, whatsappLink } from '../data/restaurant'
import { Link } from '../router'

const counts = Object.fromEntries(
  groups.map((g) => [g.id, menu.filter((s) => s.group === g.id).reduce((n, s) => n + s.items.length, 0)]),
)

const teaser = galleryItems.filter((g) => ['mix-grill', 'masala-dosa', 'kizhi-poratta', 'mango-falooda', 'seafood-platter', 'grand-beef-burger'].includes(g.image))

export default function Home() {
  return (
    <>
      <Hero />
      <CuisineStrip />
      <Signature />

      <section className="section categories" aria-labelledby="cat-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Browse the menu</p>
            <h2 id="cat-title" className="section-title">Something for every table</h2>
            <p className="section-sub">Pick a category to jump straight to it on the menu.</p>
          </div>
          <ul className="cat-grid">
            {groups.map((g, i) => (
              <li key={g.id} data-reveal style={{ '--d': `${(i % 4) * 50}ms` }}>
                <Link to={`menu/${g.id}`} className="cat-card">
                  <Img name={g.image} alt="" size="thumb" width="360" height="270" />
                  <span className="cat-meta">
                    <b>{g.label}</b>
                    <span>{counts[g.id]} dishes</span>
                  </span>
                  <IconArrow className="cat-arrow" width={18} height={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-gallery" aria-labelledby="hg-title">
        <div className="container">
          <div className="hg-head" data-reveal>
            <div className="section-head section-head-light">
              <p className="eyebrow eyebrow-light">Gallery</p>
              <h2 id="hg-title" className="section-title">Fresh from our kitchen</h2>
            </div>
            <Link to="gallery" className="btn btn-outline-light">
              See all photos <IconArrow width={16} height={16} />
            </Link>
          </div>
          <ul className="hg-grid">
            {teaser.map((g) => (
              <li key={g.image} data-reveal>
                <GalleryCard item={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <div>
            <h2 id="cta-title">Hungry? Delivery is free.</h2>
            <p>{restaurant.address.line1}, {restaurant.address.line2}</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-whatsapp btn-lg" href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp width={19} height={19} /> WhatsApp {restaurant.whatsappDisplay}
            </a>
            <a className="btn btn-dark btn-lg" href={`tel:${restaurant.phones[0].tel}`}>
              <IconPhone width={18} height={18} /> {restaurant.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
