import PageHeader from '../components/PageHeader'
import Menu from '../components/Menu'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import CuisineStrip from '../components/CuisineStrip'
import { groups, itemCount } from '../data/menu'
import { restaurant } from '../data/restaurant'
import { Link } from '../router'

export function MenuPage({ group, highlight }) {
  return (
    <>
      <PageHeader
        eyebrow="Our menu"
        title={`${itemCount} dishes, ${groups.length} categories`}
        crumb="Menu"
        image="chicken-biriyani"
        sub="All prices in AED. Tap + on any dish to build an order and send it to us on WhatsApp. We'll confirm the total and delivery."
      />
      <Menu initialGroup={group} highlight={highlight} />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Our story"
        crumb="About"
        image="mutton-mandi"
        sub={`${restaurant.tagline} in Barsha Heights, Dubai.`}
      />
      <About />
      <CuisineStrip />
    </>
  )
}

export function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Fresh from our kitchen" crumb="Gallery" image="mix-grill" sub="Dishes from our menu. Tap any photo to find it on the menu." />
      <Gallery />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit or order"
        title="Contact us"
        crumb="Contact"
        image="seafood-platter"
        sub={`${restaurant.address.line1}, ${restaurant.address.line2}`}
      />
      <Contact showHead={false} />
    </>
  )
}

export function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" crumb="Not found" sub="That page doesn't exist." />
      <section className="section">
        <div className="container">
          <Link to="" className="btn btn-primary btn-lg">Back to home</Link>
        </div>
      </section>
    </>
  )
}
