import { menu, priceOptions, formatPrice } from '../data/menu'
import { useOrder } from '../order'
import { IconPlus } from './Icons'
import Img from './Img'
import { Link } from '../router'

// Featured dishes — picked from the menu by item number so names/prices stay in sync.
const picks = [
  { no: 95, blurb: 'Smoky, tender chicken over perfectly spiced mandi rice.' },
  { no: 70, blurb: 'The true nadan taste of Thalassery, slow-cooked dum style.' },
  { no: 119, blurb: 'Our house charcoal chicken — smoky, juicy, full of flavour.' },
  { no: 100, blurb: 'Tender mutton haneeth ribs served over fragrant rice.' },
  { no: 251, blurb: 'A Thani Nadan dinner special — Kerala flavour, chicken or beef.' },
  { no: 189, blurb: 'Boneless chicken in a rich, buttery tomato gravy.' },
]

const allItems = menu.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })))

export default function Signature() {
  const { add } = useOrder()
  const dishes = picks
    .map((p) => ({ ...allItems.find((i) => i.no === p.no && i.image), blurb: p.blurb }))
    .filter((d) => d.name)

  return (
    <section id="signature" className="section signature" aria-labelledby="sig-title">
      <div className="container">
        <div className="section-head section-head-light" data-reveal>
          <p className="eyebrow eyebrow-light">House favourites</p>
          <h2 id="sig-title" className="section-title">Signature dishes</h2>
          <p className="section-sub">A taste of everything we do — from the mandi oven to the tandoor.</p>
        </div>

        <ul className="sig-grid">
          {dishes.map((d, i) => {
            const opts = priceOptions(d)
            const nums = opts.map((o) => o.value).filter((v) => v != null)
            const priceText = opts.length > 1 ? `from AED ${formatPrice(Math.min(...nums))}` : `AED ${formatPrice(opts[0].value)}`
            return (
              <li key={d.key} className="sig-card" data-reveal style={{ '--d': `${i * 60}ms` }}>
                <div className="sig-img">
                  <Img name={d.image} alt={d.name} width="400" height="300" />
                  <span className="sig-cat">{d.section}</span>
                </div>
                <div className="sig-body">
                  <h3>{d.name}</h3>
                  <p>{d.blurb}</p>
                  <div className="sig-foot">
                    <span className="sig-price">{priceText}</span>
                    <button className="btn btn-chip" onClick={() => add(d)} aria-label={`Add ${d.name} to WhatsApp order`}>
                      <IconPlus width={16} height={16} /> Add
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="sig-more">
          <Link to="menu" className="btn btn-outline-light btn-lg">View the full menu</Link>
        </div>
      </div>
    </section>
  )
}
