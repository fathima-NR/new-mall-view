import { restaurant } from '../data/restaurant'
import { itemCount } from '../data/menu'
import { IconBag, IconCard, IconSun, IconTruck } from './Icons'
import Img from './Img'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-media" data-reveal>
          <figure className="about-img about-img-main">
            <Img name="mutton-mandi" alt="Mutton mandi on a platter" width="460" height="420" />
          </figure>
          <figure className="about-img about-img-small">
            <Img name="masala-dosa" alt="Masala dosa with chutneys and sambar" size="thumb" width="300" height="360" />
          </figure>
          <div className="about-badge">
            <b>{itemCount}</b>
            <span>dishes on our menu</span>
          </div>
        </div>

        <div className="about-copy" data-reveal>
          <p className="eyebrow">About us</p>
          <h2 id="about-title" className="section-title">
            A neighbourhood kitchen with many homes.
          </h2>
          <p className="lead">
            {restaurant.name} brings a traditional multi-cuisine kitchen to Barsha Heights — smoky
            Yemeni mandi and haneeth, charcoal grills and tandoor, Thalassery biriyani, Kerala
            &ldquo;thani nadan&rdquo; specials, Indian curries, Chinese, Filipino favourites, burgers,
            fresh juices and desserts.
          </p>
          <p>
            Start the day with dosa, puttu and karak from 5 AM, stay for a lunch-time mandi, or order a
            family feast for the evening. Whatever you choose, delivery is on us.
          </p>

          <ul className="feature-list">
            <li>
              <span className="feature-ic"><IconSun /></span>
              <div>
                <b>Breakfast from 5 AM</b>
                <span>South Indian &amp; continental, served {restaurant.breakfastHours}</span>
              </div>
            </li>
            <li>
              <span className="feature-ic"><IconTruck /></span>
              <div>
                <b>Free delivery</b>
                <span>Call or WhatsApp us to order</span>
              </div>
            </li>
            <li>
              <span className="feature-ic"><IconBag /></span>
              <div>
                <b>Order online</b>
                <span>Find us on {restaurant.orderOnline.join(', ')}</span>
              </div>
            </li>
            <li>
              <span className="feature-ic"><IconCard /></span>
              <div>
                <b>Cards accepted</b>
                <span>Credit &amp; debit — {restaurant.payments.join(' and ')}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
