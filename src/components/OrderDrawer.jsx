import { useEffect, useRef } from 'react'
import { formatPrice } from '../data/menu'
import { useOrder } from '../order'
import { Link } from '../router'
import { IconClose, IconMinus, IconPlus, IconTrash, IconWhatsApp } from './Icons'

export default function OrderDrawer() {
  const { open, setOpen, summary, update, clear, count, sendLink } = useOrder()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="drawer-head">
          <div>
            <h2 id="order-title">Your WhatsApp order</h2>
            <p>{count ? `${count} item${count > 1 ? 's' : ''}` : 'No items yet'}</p>
          </div>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close order">
            <IconClose />
          </button>
        </header>

        {summary.rows.length === 0 ? (
          <div className="drawer-empty">
            <p>Tap <b>+</b> next to any dish on the menu to add it here.</p>
            <Link to="menu" className="btn btn-primary" onClick={() => setOpen(false)}>
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {summary.rows.map((r) => (
                <li key={r.id} className="dl">
                  <div className="dl-main">
                    <b>{r.name}</b>
                    <span className="dl-no">#{r.no}</span>
                    {r.opts.length > 1 && (
                      <label className="dl-opt">
                        <span className="sr-only">Choose option for {r.name}</span>
                        <select value={r.opt} onChange={(e) => update(r.id, { opt: Number(e.target.value) })}>
                          {r.opts.map((o, i) => (
                            <option key={i} value={i}>
                              {o.label?.startsWith('Option') ? '' : `${o.label} — `}
                              {o.value == null ? 'ASP' : `AED ${formatPrice(o.value)}`}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                  <div className="dl-side">
                    <div className="qty">
                      <button onClick={() => update(r.id, { qty: r.qty - 1 })} aria-label={`Remove one ${r.name}`}>
                        {r.qty === 1 ? <IconTrash width={15} height={15} /> : <IconMinus width={15} height={15} />}
                      </button>
                      <span aria-live="polite">{r.qty}</span>
                      <button onClick={() => update(r.id, { qty: r.qty + 1 })} aria-label={`Add one more ${r.name}`}>
                        <IconPlus width={15} height={15} />
                      </button>
                    </div>
                    <span className="dl-price">
                      {r.o.value == null ? 'ASP' : `AED ${formatPrice(r.o.value * r.qty)}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer-foot">
              <div className="drawer-total">
                <span>Estimated total</span>
                <b>AED {formatPrice(summary.total)}</b>
              </div>
              <p className="drawer-fine">
                {summary.hasAsp && 'Items marked ASP are priced by our team. '}
                No payment is taken online — we&apos;ll confirm your order, final price and delivery on WhatsApp.
              </p>
              <a className="btn btn-whatsapp btn-lg btn-block" href={sendLink} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width={20} height={20} /> Send order on WhatsApp
              </a>
              <button className="btn-text" onClick={clear}>Clear list</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
