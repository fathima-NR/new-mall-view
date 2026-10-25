import { restaurant, whatsappLink } from '../data/restaurant'
import { IconArrow, IconSun, IconTruck, IconWhatsApp } from './Icons'
import Img from './Img'
import { Link } from '../router'

// Four dishes shown at a size their photos can hold sharply.
const tiles = [
  { image: 'mix-grill', name: 'Mix Grill', price: 'from AED 55', to: 'menu/grills/128' },
  { image: 'chicken-mandi', name: 'Chicken Mandi', price: 'AED 29', to: 'menu/mandi/95' },
  { image: 'mallview-charcoal', name: 'Special Charcoal', price: 'from AED 25', to: 'menu/grills/119' },
  { image: 'chicken-biriyani', name: 'Thalassery Biriyani', price: 'from AED 14', to: 'menu/biriyani/70' },
]

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">
            Multi-cuisine · Barsha Heights, Dubai
          </p>
          <h1 id="hero-title" className="hero-title">
            Authentic mandi, <em>sizzling grills</em> &amp; traditional favourites.
          </h1>
          <p className="hero-lede">
            Charcoal grills, fragrant biriyani, Indian curries, Chinese and Filipino favourites,
            fresh juices and breakfast from 5 AM. Visit us, or let us bring it to you — delivery is free.
          </p>

          <div className="hero-ctas">
            <Link to="menu" className="btn btn-primary btn-lg">
              Explore the menu <IconArrow width={18} height={18} />
            </Link>
            <a
              href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)}
              className="btn btn-outline-light btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp width={19} height={19} /> Order on WhatsApp
            </a>
          </div>

          <ul className="hero-facts" aria-label="Highlights">
            <li>
              <IconTruck /> <span><strong>Free delivery</strong></span>
            </li>
            <li>
              <IconSun /> <span><strong>Breakfast</strong> {restaurant.breakfastHours}</span>
            </li>
          </ul>
        </div>

        <div className="hero-visual hero-mosaic">
          {tiles.map((t, i) => (
            <Link key={t.image} to={t.to} className={`hm-tile hm-${i}`}>
              <Img name={t.image} alt={t.name} eager={i < 2} width="450" height="450" />
              <span className="hm-cap">
                <span>{t.name}</span>
                <b>{t.price}</b>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
