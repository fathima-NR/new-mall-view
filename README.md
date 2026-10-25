# New Mall View Restaurant — website

React + Vite site for New Mall View Restaurant, Barsha Heights (Tecom), Dubai.
Menu, prices, contact details and photos come from the restaurant's printed menu card.
**Read `VERIFY.md` before launch** — it lists placeholders and unclear menu entries.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. Vercel detects Vite automatically
   (build `npm run build`, output `dist` — also set in `vercel.json`).
3. Deploy. Or from a terminal: `npx vercel --prod`.

## Where to edit

| What | File |
|---|---|
| Address, phones, WhatsApp, opening hours, social links | `src/data/restaurant.js` |
| Menu items, prices, categories, photos per dish | `src/data/menu.js` |
| Featured "Signature dishes" (by item number) | `src/components/Signature.jsx` |
| Gallery photos | `src/components/Gallery.jsx` |
| Colours, fonts, spacing | `src/styles.css` (tokens at the top) |
| Photos | `public/images/dishes` (720px) and `public/images/thumbs` (360px) |
| Logo / favicon | `public/brand`, `public/favicon.png` |

Menu item format: `[number, name, price, variants?, image?, note?]`, e.g.
`[70, 'Thalassery Dum Biriyani', '14/16/18/ASP', ['Chicken','Beef','Mutton','Fish'], 'chicken-biriyani']`.

## Pages

`/` Home · `/menu` (and `/menu/<category>`, e.g. `/menu/grills`) · `/about` · `/gallery` · `/contact`.
Routing is built in (`src/router.jsx`, no extra package); `vercel.json` rewrites all page URLs to `index.html`.
On screens 1024px and wider the whole site is shown at 80% scale (`zoom: 0.8` at the end of `styles.css`).

## Features

- Hero, signature dishes, full digital menu (540 items in 12 categories) with search,
  about, gallery with lightbox, contact with Google Map, footer.
- **WhatsApp order list**: guests tap + on dishes, then send the list to 050 656 2142 as a
  WhatsApp message. No payment or checkout happens on the site.
- Floating WhatsApp button (desktop) and Call / WhatsApp / Directions bar (mobile).
- Responsive, keyboard accessible, reduced-motion aware, lazy-loaded WebP images.

## Structure

```
src/
  App.jsx, main.jsx, router.jsx, order.jsx (WhatsApp order state), styles.css
  data/        restaurant.js, menu.js
  pages/       Home.jsx, Pages.jsx (Menu, About, Gallery, Contact)
  hooks/       useReveal.js
  components/  Header, Hero, CuisineStrip, Signature, Menu, About, Gallery,
               Contact, Footer, FloatingActions, OrderDrawer, Img, Icons
```
