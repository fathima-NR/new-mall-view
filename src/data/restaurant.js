// Business details taken from the printed menu card (cover page).
// Anything marked TODO was NOT on the menu card and must be confirmed by the restaurant.

export const restaurant = {
  name: 'New Mall View Restaurant',
  shortName: 'Mall View',
  tagline: 'Traditional Multi Cuisine',
  cuisines: ['Yemen Mandi', 'Continental', 'Grills', 'Indian', 'Filipino'],
  address: {
    line1: 'Boutique 7 Residence, Al Khareef Street 1',
    line2: 'Barsha Heights (Tecom), Dubai, U.A.E.',
  },
  phones: [
    { label: 'Landline', display: '04 336 0902', tel: '+97143360902' },
    { label: 'Landline', display: '04 886 3966', tel: '+97148863966' },
    { label: 'Mobile', display: '050 575 1036', tel: '+971505751036' },
    { label: 'Mobile · WhatsApp', display: '050 656 2142', tel: '+971506562142' },
  ],
  // The menu card shows the WhatsApp icon next to 050 656 2142.
  whatsapp: '971506562142',
  whatsappDisplay: '050 656 2142',
  freeDelivery: true,
  breakfastHours: '5:00 AM – 11:00 AM',
  // TODO: full opening hours were not printed on the menu card — confirm with the restaurant.
  openingHours: null,
  orderOnline: ['Keeta', 'Talabat', 'Smiles', 'Noon'],
  // Menu card: "We accept credit/debit card" with Visa and Mastercard marks.
  payments: ['Visa', 'Mastercard'],
  social: {
    handle: '@mallviewgroup',
    // The menu card prints "/mallviewgroup" next to Facebook and Instagram icons.
    // TODO: confirm these profile URLs are correct before launch.
    facebook: 'https://www.facebook.com/mallviewgroup',
    instagram: 'https://www.instagram.com/mallviewgroup',
  },
  mapsQuery: 'Boutique 7 Residence, Al Khareef Street 1, Barsha Heights, Dubai',
}

export const whatsappLink = (text) =>
  `https://wa.me/${restaurant.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  restaurant.mapsQuery,
)}&output=embed`

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  restaurant.mapsQuery,
)}`
