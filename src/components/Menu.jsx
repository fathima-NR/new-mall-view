import { useEffect, useMemo, useRef, useState } from 'react'
import { groups, menu, priceOptions, formatPrice } from '../data/menu'
import { useOrder } from '../order'
import { useReveal } from '../hooks/useReveal'
import { IconClose, IconPlus, IconSearch } from './Icons'
import Img from './Img'

function MenuItem({ item }) {
  const { add } = useOrder()
  const opts = priceOptions(item)
  const labelled = opts.length > 1 && item.variants
  const nums = opts.map((o) => o.value).filter((v) => v != null)

  // Every price is shown with AED (ASP = ask for price, so no currency).
  const aed = (v) => (v == null ? 'ASP' : <><small className="aed">AED</small> {formatPrice(v)}</>)

  let price
  if (opts.length === 1) price = aed(opts[0].value)
  else if (labelled && nums.length) price = (
    <>
      <small>from</small> {aed(Math.min(...nums))}
    </>
  )
  else price = opts.map((o, i) => <span key={i}>{aed(o.value)}</span>)
  const multi = opts.length > 1 && !(labelled && nums.length)

  return (
    <li className={`mi ${item.image ? 'mi-has-img' : ''}`} data-no={item.no}>
      {item.image ? (
        <div className="mi-thumb">
          <Img name={item.image} alt="" size="thumb" width="72" height="72" />
        </div>
      ) : (
        <span className="mi-no" aria-hidden="true">{item.no}</span>
      )}
      <div className="mi-main">
        <h4 className="mi-name">
          {item.name}
          {item.image && <span className="mi-no-inline"> · {item.no}</span>}
        </h4>
        {labelled && (
          <p className="mi-variants">
            {opts.map((o, i) => (
              <span key={i}>
                {o.label} <b>{o.value == null ? 'ASP' : `AED ${formatPrice(o.value)}`}</b>
              </span>
            ))}
          </p>
        )}
        {item.note && <p className="mi-note">{item.note}</p>}
      </div>
      <div className="mi-side">
        <span className={`mi-price ${multi ? 'mi-price-multi' : ''}`} aria-label={`Price: ${item.price.includes('ASP') && opts.length === 1 ? 'ask for price' : 'AED ' + item.price}`}>
          {price}
        </span>
        <button className="mi-add" onClick={() => add(item)} aria-label={`Add ${item.name} to WhatsApp order`}>
          <IconPlus width={16} height={16} />
        </button>
      </div>
    </li>
  )
}

function Section({ s }) {
  return (
    <article className="menu-section" id={`sec-${s.id}`}>
      <header className="ms-head">
        <div>
          <h3 className="ms-title">{s.title}</h3>
          {s.desc && <p className="ms-desc">{s.desc}</p>}
        </div>
        {s.badge && <span className="ms-badge">{s.badge}</span>}
      </header>
      <ul className="ms-items">
        {s.items.map((it) => (
          <MenuItem key={it.key} item={it} />
        ))}
      </ul>
    </article>
  )
}

export default function Menu({ initialGroup, highlight }) {
  const valid = groups.some((g) => g.id === initialGroup)
  const [active, setActive] = useState(valid ? initialGroup : groups[0].id)
  useEffect(() => {
    if (groups.some((g) => g.id === initialGroup)) setActive(initialGroup)
  }, [initialGroup])

  // Coming from the gallery: scroll to the dish and flash it.
  useEffect(() => {
    if (!highlight) return
    const t = setTimeout(() => {
      const el = document.querySelector(`[data-no="${highlight}"]`)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('is-highlight')
      setTimeout(() => el.classList.remove('is-highlight'), 3200)
    }, 350)
    return () => clearTimeout(t)
  }, [highlight, initialGroup])
  const [q, setQ] = useState('')
  const topRef = useRef(null)
  useReveal([active])

  const query = q.trim().toLowerCase()

  const visible = useMemo(() => {
    if (!query) return menu.filter((s) => s.group === active)
    return menu
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (i) =>
            i.name.toLowerCase().includes(query) ||
            (i.note || '').toLowerCase().includes(query) ||
            (i.variants || []).join(' ').toLowerCase().includes(query) ||
            String(i.no) === query ||
            s.title.toLowerCase().includes(query),
        ),
      }))
      .filter((s) => s.items.length)
  }, [active, query])

  const resultCount = visible.reduce((n, s) => n + s.items.length, 0)

  const pick = (id) => {
    setActive(id)
    setQ('')
    const el = topRef.current
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeGroup = groups.find((g) => g.id === active)

  return (
    <section id="menu" className="section menu menu-page" aria-label="Menu">
      <div className="menu-bar" ref={topRef}>
        <div className="container menu-bar-inner">
          <div className="menu-search">
            <IconSearch width={18} height={18} />
            <label htmlFor="menu-q" className="sr-only">Search the menu</label>
            <input
              id="menu-q"
              type="search"
              placeholder="Search dishes — e.g. mandi, biriyani, karak"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            {q && (
              <button className="icon-btn icon-btn-sm" onClick={() => setQ('')} aria-label="Clear search">
                <IconClose width={16} height={16} />
              </button>
            )}
          </div>
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {groups.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={!query && active === g.id}
                aria-controls="menu-panel"
                className={`tab ${!query && active === g.id ? 'is-active' : ''}`}
                onClick={() => pick(g.id)}
              >
                <span className="tab-img">
                  <Img name={g.image} alt="" size="thumb" width="28" height="28" />
                </span>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div id="menu-panel" role="tabpanel" aria-live="polite" className="menu-panel">
          {query ? (
            <p className="menu-results">
              {resultCount ? (
                <>
                  <b>{resultCount}</b> {resultCount === 1 ? 'dish matches' : 'dishes match'} &ldquo;{q}&rdquo;
                </>
              ) : (
                <>No dishes match &ldquo;{q}&rdquo;. Try another word, or browse by category.</>
              )}
            </p>
          ) : (
            <div className="menu-group-head">
              <h3>{activeGroup.label}</h3>
              <span>{visible.reduce((n, s) => n + s.items.length, 0)} dishes</span>
            </div>
          )}

          <div className="menu-sections">
            {visible.map((s) => (
              <Section key={s.id} s={s} />
            ))}
          </div>

          <p className="menu-legend">
            <b>ASP</b> — price on request; please ask our team.
            Prices are as printed on our menu card and may change.
          </p>
        </div>
      </div>
    </section>
  )
}
