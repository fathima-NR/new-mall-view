import { menu } from './menu'

// Gallery photos (cropped from the restaurant's menu card), each linked to its dish on the menu.
// `no` is the menu item number; the category and price are looked up from menu.js.
const list = [
  ['chicken-mandi', 95],
  ['mallview-charcoal', 119],
  ['chicken-biriyani', 70],
  ['haneeth-shoulder', 99],
  ['butter-chicken', 189],
  ['mix-grill', 128],
  ['masala-dosa', 3],
  ['kizhi-poratta', 251],
  ['seafood-platter', 136],
  ['grand-beef-burger', 433],
  ['mango-falooda', 500],
  ['haneeth-ribs', 100],
  ['tandoor-chicken', 139],
  ['hyderabadi-biriyani', 72],
  ['karak-zafran', 524],
  ['spaghetti-meatballs', 390],
  ['chicken-manchurian', 292],
  ['english-breakfast', 23],
  ['paal-kappa', 265],
  ['loaded-fries', 56],
  ['mutton-mandi', 98],
  ['halo-halo', 395],
  ['zinker-club', 445],
  ['schezwan-noodles', 286],
  ['irachi-choru', 79],
  ['chicken-alfredo', 149],
  ['oreo-milkshake', 492],
  ['caesar-salad', 35],
  ['kabab-rice', 106],
  ['russian-honey-cake', 540],
]

export const galleryFilters = [
  { id: 'all', label: 'All', groups: null },
  { id: 'mandi-grills', label: 'Mandi & Grills', groups: ['mandi', 'grills'] },
  { id: 'indian', label: 'Biriyani & Indian', groups: ['biriyani', 'indian', 'kerala', 'breakfast'] },
  { id: 'burgers', label: 'Burgers & Bites', groups: ['burgers', 'starters'] },
  { id: 'asian', label: 'Chinese & Filipino', groups: ['chinese', 'filipino'] },
  { id: 'sweet', label: 'Drinks & Desserts', groups: ['drinks', 'desserts'] },
]

export const galleryItems = list
  .map(([image, no]) => {
    for (const s of menu) {
      const item = s.items.find((i) => i.no === no)
      if (item) return { image, no, name: item.name, price: item.price, variants: item.variants, group: s.group, section: s.title }
    }
    return null
  })
  .filter(Boolean)
