import { restaurant, whatsappLink, mapsEmbedSrc, mapsLink } from '../data/restaurant'
import { IconArrow, IconClock, IconPhone, IconPin, IconWhatsApp } from './Icons'

export default function Contact({ showHead = true }) {
  return (
    <section id="contact" className="section contact" aria-label="Contact details">
      <div className="container">
        {showHead && (
          <div className="section-head" data-reveal>
            <p className="eyebrow">Visit or order</p>
            <h2 id="contact-title" className="section-title">Find us in Barsha Heights</h2>
          </div>
        )}

        <div className="contact-grid">
          <div className="contact-cards" data-reveal>
            <div className="c-card">
              <span className="c-ic"><IconPin /></span>
              <div>
                <h3>Address</h3>
                <address>
                  {restaurant.address.line1}
                  <br />
                  {restaurant.address.line2}
                </address>
                <a className="c-link" href={mapsLink} target="_blank" rel="noopener noreferrer">
                  Get directions <IconArrow width={15} height={15} />
                </a>
              </div>
            </div>

            <div className="c-card">
              <span className="c-ic"><IconPhone /></span>
              <div>
                <h3>Call us</h3>
                <ul className="phone-list">
                  {restaurant.phones.map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`}>{p.display}</a>
                      <span>{p.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="c-card">
              <span className="c-ic"><IconClock /></span>
              <div>
                <h3>Opening hours</h3>
                <dl className="hours">
                  <div>
                    <dt>Breakfast</dt>
                    <dd>{restaurant.breakfastHours}</dd>
                  </div>
                  <div>
                    <dt>Arabic special meals</dt>
                    <dd>Lunch time</dd>
                  </div>
                  <div>
                    <dt>Restaurant hours</dt>
                    <dd>
                      {restaurant.openingHours || <span className="placeholder">To be confirmed</span>}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <a
              className="c-card c-card-wa"
              href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="c-ic"><IconWhatsApp /></span>
              <div>
                <h3>WhatsApp {restaurant.whatsappDisplay}</h3>
                <p>Message us to order — free delivery.</p>
              </div>
              <IconArrow className="c-arrow" />
            </a>

            <div className="c-online">
              <span>Also on</span>
              {restaurant.orderOnline.map((o) => (
                <b key={o}>{o}</b>
              ))}
            </div>
          </div>

          <div className="map-wrap" data-reveal>
            <iframe
              title={`Map showing ${restaurant.name}, ${restaurant.address.line2}`}
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
