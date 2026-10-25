import { restaurant, whatsappLink } from '../data/restaurant'
import { Link } from '../router'
import { IconFacebook, IconInstagram, IconWhatsApp } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/brand/logo-white.webp" alt={restaurant.name} width="150" height="107" loading="lazy" />
          <p>{restaurant.tagline} — {restaurant.cuisines.join(' · ')}</p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="">Home</Link></li>
            <li><Link to="menu">Menu</Link></li>
            <li><Link to="about">About us</Link></li>
            <li><Link to="gallery">Gallery</Link></li>
            <li><Link to="contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <address>
            {restaurant.address.line1}
            <br />
            {restaurant.address.line2}
          </address>
          <ul className="footer-phones">
            {restaurant.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>{p.display}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Follow us</h3>
          <div className="socials">
            <a href={restaurant.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Mall View on Facebook">
              <IconFacebook />
            </a>
            <a href={restaurant.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Mall View on Instagram">
              <IconInstagram />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
              <IconWhatsApp />
            </a>
          </div>
          <p className="footer-handle">{restaurant.social.handle}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {restaurant.name}. All rights reserved.</p>
        <p>Prices in AED, as listed on our menu card and subject to change.</p>
      </div>
    </footer>
  )
}
