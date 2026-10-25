import { useMemo, useState } from 'react'
import { galleryFilters, galleryItems } from '../data/gallery'
import { priceOptions, formatPrice } from '../data/menu'
import { Link } from '../router'
import { IconArrow } from './Icons'
import Img from './Img'

function priceLabel(item) {
  const opts = priceOptions(item)
  const nums = opts.map((o) => o.value).filter((v) => v != null)
  if (!nums.length) return 'Ask for price'
  return opts.length > 1 ? `from AED ${formatPrice(Math.min(...nums))}` : `AED ${formatPrice(nums[0])}`
}

export function GalleryCard({ item, big = false, eager = false }) {
  return (
    <Link to={`menu/${item.group}/${item.no}`} className={`gcard ${big ? 'gcard-big' : ''}`} aria-label={`${item.name}, ${priceLabel(item)}. View on the menu`}>
      <Img name={item.image} alt={item.name} size={big ? 'full' : 'thumb'} eager={eager} />
      <span className="gcard-shade" aria-hidden="true" />
      <span className="gcard-info">
        <span className="gcard-cat">{item.section}</span>
        <b className="gcard-name">{item.name}</b>
        <span className="gcard-row">
          <span className="gcard-price">{priceLabel(item)}</span>
          <span className="gcard-go">
            View on menu <IconArrow width={15} height={15} />
          </span>
        </span>
      </span>
    </Link>
  )
}

// Choose how many large tiles to use so the grid ends on a full row (4 columns desktop, 3 tablet).
function bigSlots(n) {
  const fits = (b, m) => (n + 3 * b) % m === 0
  let b = [2, 1, 3].find((x) => fits(x, 4) && fits(x, 3))
  if (b === undefined) b = [2, 1, 3, 4].find((x) => fits(x, 4) && n >= x * 6)
  if (b === undefined) b = 0
  return new Set(Array.from({ length: b }, (_, k) => Math.round((k * n) / b / 2) * 2))
}

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const items = useMemo(() => {
    const f = galleryFilters.find((x) => x.id === filter)
    return f.groups ? galleryItems.filter((i) => f.groups.includes(i.group)) : galleryItems
  }, [filter])
  const bigs = useMemo(() => bigSlots(items.length), [items.length])

  return (
    <section id="gallery" className="section gallery" aria-label="Photo gallery">
      <div className="container">
        <div className="gallery-filters" role="tablist" aria-label="Filter photos">
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`gfilter ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="gallery-hint">Tap a photo to see the dish and its price on our menu.</p>

        <ul className="ggrid" key={filter}>
          {items.map((it, i) => (
            <li key={it.image} className={bigs.has(i) ? 'ggrid-big' : ''} style={{ '--i': i }}>
              <GalleryCard item={it} big={bigs.has(i)} eager={i < 4} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
