import { useEffect, useState } from 'react'
import { restaurant, whatsappLink } from '../data/restaurant'
import { Link, useRouter } from '../router'
import { IconClose, IconMenu, IconPhone, IconWhatsApp } from './Icons'

const links = [
  { to: '', label: 'Home' },
  { to: 'menu', label: 'Menu' },
  { to: 'about', label: 'About' },
  { to: 'gallery', label: 'Gallery' },
  { to: 'contact', label: 'Contact' },
]

export default function Header() {
  const { path } = useRouter()
  const isActive = (to) => (to === '' ? path === '' : path === to || path.startsWith(to + '/'))
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="" className="brand" aria-label={`${restaurant.name} — home`} onClick={close}>
          <img src="/brand/logo-white.webp" alt="" width="112" height="80" />
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={isActive(l.to) ? 'is-active' : ''} aria-current={isActive(l.to) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-ghost btn-sm hide-sm" href={`tel:${restaurant.phones[0].tel}`}>
            <IconPhone width={16} height={16} />
            {restaurant.phones[0].display}
          </a>
          <a
            className="btn btn-whatsapp btn-sm"
            href={whatsappLink(`Hello ${restaurant.name}, I'd like to place an order.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp width={17} height={17} />
            <span className="hide-xs">Order on</span> WhatsApp
          </a>
          <button
            className="icon-btn nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} onClick={close} style={{ '--i': i }} className={isActive(l.to) ? 'is-active' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-nav-foot">
          <a className="btn btn-primary" href={`tel:${restaurant.phones[0].tel}`} onClick={close}>
            <IconPhone width={18} height={18} /> Call {restaurant.phones[0].display}
          </a>
          <p>{restaurant.address.line1}, {restaurant.address.line2}</p>
        </div>
      </div>
    </header>
  )
}
