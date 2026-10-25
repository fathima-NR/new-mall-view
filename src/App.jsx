import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import OrderDrawer from './components/OrderDrawer'
import Home from './pages/Home'
import { MenuPage, AboutPage, GalleryPage, ContactPage, NotFound } from './pages/Pages'
import { OrderProvider } from './order'
import { RouterProvider, useRouter } from './router'
import { useReveal } from './hooks/useReveal'
import { restaurant } from './data/restaurant'

const titles = {
  '': `${restaurant.name} · Multi-Cuisine in Barsha Heights, Dubai`,
  menu: `Menu · ${restaurant.name}`,
  about: `About Us · ${restaurant.name}`,
  gallery: `Gallery · ${restaurant.name}`,
  contact: `Contact · ${restaurant.name}`,
}

function Routes() {
  const { path } = useRouter()
  const [page, sub, extra] = path.split('/')
  useReveal([path])

  useEffect(() => {
    document.title = titles[page] ?? `Page not found · ${restaurant.name}`
  }, [page])

  let view
  if (page === '') view = <Home />
  else if (page === 'menu') view = <MenuPage group={sub} highlight={extra ? Number(extra) : null} />
  else if (page === 'about') view = <AboutPage />
  else if (page === 'gallery') view = <GalleryPage />
  else if (page === 'contact') view = <ContactPage />
  else view = <NotFound />

  return (
    <main id="main" key={page} tabIndex={-1}>
      {view}
    </main>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <OrderProvider>
        <a
          href="#main"
          className="skip-link"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('main')?.focus()
          }}
        >
          Skip to content
        </a>
        <Header />
        <Routes />
        <Footer />
        <FloatingActions />
        <OrderDrawer />
      </OrderProvider>
    </RouterProvider>
  )
}
