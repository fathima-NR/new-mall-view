import { restaurant, whatsappLink, mapsLink } from '../data/restaurant'
import { useOrder } from '../order'
import { IconBag, IconPhone, IconPin, IconWhatsApp } from './Icons'

export default function FloatingActions() {
  const { count, setOpen, toast } = useOrder()

  return (
    <>
      {/* Order list pill — appears once something is added */}
      <button
        className={`order-pill ${count ? 'is-visible' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={`Review WhatsApp order, ${count} item${count === 1 ? '' : 's'}`}
        tabIndex={count ? 0 : -1}
      >
        <IconBag width={18} height={18} />
        <span className="order-pill-count">{count}</span>
        <span>Review order</span>
      </button>

      {/* Desktop: floating WhatsApp button */}
      <a
        className="wa-fab"
        href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${restaurant.name} on WhatsApp`}
      >
        <IconWhatsApp width={28} height={28} />
      </a>

      {/* Mobile: bottom action bar */}
      <nav className="mobile-bar" aria-label="Quick actions">
        <a href={`tel:${restaurant.phones[0].tel}`}>
          <IconPhone width={19} height={19} /> Call
        </a>
        <a
          className="mb-wa"
          href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsApp width={20} height={20} /> WhatsApp
        </a>
        <a href={mapsLink} target="_blank" rel="noopener noreferrer">
          <IconPin width={19} height={19} /> Directions
        </a>
      </nav>

      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  )
}
