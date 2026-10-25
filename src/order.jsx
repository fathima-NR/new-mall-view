import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { priceOptions, formatPrice } from './data/menu'
import { restaurant, whatsappLink } from './data/restaurant'

// A simple WhatsApp order list. No payment or checkout happens on the site:
// the list is turned into a WhatsApp message and the restaurant confirms the order.

const OrderCtx = createContext(null)
const STORAGE_KEY = 'mallview-order-v1'

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function OrderProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }, [lines])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const add = useCallback((item) => {
    setLines((ls) => {
      const i = ls.findIndex((l) => l.key === item.key && l.opt === 0)
      if (i >= 0) return ls.map((l, j) => (j === i ? { ...l, qty: l.qty + 1 } : l))
      return [
        ...ls,
        { id: `${item.key}-${Date.now()}`, key: item.key, no: item.no, name: item.name, price: item.price, variants: item.variants, opt: 0, qty: 1 },
      ]
    })
    setToast(`${item.name} added`)
  }, [])

  const update = useCallback((id, patch) => {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)).filter((l) => l.qty > 0))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = lines.reduce((n, l) => n + l.qty, 0)

  const summary = useMemo(() => {
    let total = 0
    let hasAsp = false
    const rows = lines.map((l) => {
      const opts = priceOptions(l)
      const o = opts[l.opt] || opts[0]
      if (o.value == null) hasAsp = true
      else total += o.value * l.qty
      const label = opts.length > 1 ? (o.label?.startsWith('Option') ? `AED ${o.raw}` : o.label) : null
      return { ...l, opts, o, label }
    })
    return { rows, total, hasAsp }
  }, [lines])

  const message = useMemo(() => {
    const out = [`Hello ${restaurant.name}! I'd like to order:`, '']
    summary.rows.forEach((r) => {
      const price = r.o.value == null ? 'ASP' : `AED ${formatPrice(r.o.value * r.qty)}`
      out.push(`• ${r.qty} × ${r.name}${r.label ? ` (${r.label})` : ''} — #${r.no} — ${price}`)
    })
    out.push('')
    out.push(`Estimated total: AED ${formatPrice(summary.total)}${summary.hasAsp ? ' + items at ASP' : ''}`)
    out.push('')
    out.push('Name: ')
    out.push('Delivery address / pickup: ')
    return out.join('\n')
  }, [summary])

  const value = { lines, add, update, clear, count, open, setOpen, summary, toast, sendLink: whatsappLink(message) }
  return <OrderCtx.Provider value={value}>{children}</OrderCtx.Provider>
}

export const useOrder = () => useContext(OrderCtx)
