import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Tiny router — no extra dependency.
// Default: real URLs (/menu, /about …) using the History API (Vercel rewrites to index.html).
// Hash mode (#menu, #menu.grills) is used when window.__HASH_ROUTER__ is set, e.g. for static previews.

const RouterCtx = createContext(null)
const HASH = typeof window !== 'undefined' && window.__HASH_ROUTER__ === true

function readPath() {
  if (HASH) {
    const h = window.location.hash.replace(/^#/, '')
    return h && h !== 'home' ? h.replace(/\./g, '/') : ''
  }
  return window.location.pathname.replace(/^\/+|\/+$/g, '')
}

export function hrefFor(path) {
  const p = path.replace(/^\/+|\/+$/g, '')
  if (HASH) return p ? `#${p.replace(/\//g, '.')}` : '#home'
  return `/${p}`
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => setPath(readPath())
    window.addEventListener(HASH ? 'hashchange' : 'popstate', onChange)
    return () => window.removeEventListener(HASH ? 'hashchange' : 'popstate', onChange)
  }, [])

  const navigate = useCallback((to) => {
    const p = to.replace(/^\/+|\/+$/g, '')
    if (HASH) window.location.hash = p ? p.replace(/\//g, '.') : 'home'
    else window.history.pushState({}, '', `/${p}`)
    setPath(p)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [])

  return <RouterCtx.Provider value={{ path, navigate }}>{children}</RouterCtx.Provider>
}

export const useRouter = () => useContext(RouterCtx)

// <Link to="menu/grills">…</Link>
export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter()
  return (
    <a
      href={hrefFor(to)}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
