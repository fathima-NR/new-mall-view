# Items to confirm before launch

Everything on the site comes from the printed menu card. The points below were
unclear, missing or corrected, and should be checked with the restaurant.

## Missing business information (shown as placeholders)

| Item | Where it appears | Status |
|---|---|---|
| Full opening hours | Contact → Opening hours ("To be confirmed") | **Not on the menu card.** Only "Breakfast 5 AM to 11 AM" and "Arabic special meals: lunch time" are printed. Set `openingHours` in `src/data/restaurant.js`. |
| Facebook / Instagram URLs | Footer | Card prints `/mallviewgroup` next to the icons; links built as facebook.com/mallviewgroup and instagram.com/mallviewgroup — **check they open the right profiles.** A third social icon on the cover is too small to identify, so it was left out. |
| Map pin | Contact map, "Get directions" | Uses an address search for "Boutique 7 Residence, Al Khareef Street 1, Barsha Heights". Replace with the restaurant's exact Google Maps link / embed if available. |
| Online ordering links | About + Contact ("Also on Keeta, Talabat, Smiles, Noon") | Shown as names only — no store URLs were on the card. The second logo on the cover is very small; it reads as **Talabat** — please confirm. |
| About-us story | About section | Written only from menu facts (cuisines, breakfast hours, free delivery, card payments). Replace with the restaurant's own story, founding year, etc. if wanted. |

## Prices / labels that are ambiguous on the card

| # | Item | Printed | Question |
|---|---|---|---|
| 128 | Mix Grill | "(HALF/FULL/QTR.) 55/85/120" | Label order doesn't match ascending prices. Shown as `55 / 85 / 120` without labels. Which price is Qtr / Half / Full? |
| 120 | Normal Chicken Charcoal (Turkish) | 18/25/45 | Labels not printed (probably Qtr / Half / Full). |
| 121–123 | Malabar, Dynamite, Peri Peri Chicken Charcoal | 25/45, 28/50, 28/50 | Labels not printed (probably Half / Full). |
| 136 | Seafood Platter | 60.00 in the list | The photo caption on the same page says **~DHS 65.00**. Which is correct? |
| 95–97 | Chicken Mandi / Madhbi / Madfoon | Single price + "MUTTON/FISH/EGG" underneath | Does that mean the same price for mutton, fish or egg? Shown as a note under the name. |
| 455–468 | Fresh juices | e.g. 12/15, 10/12 | Two prices without size labels (regular / large?). |
| 523 | Karak Tea | 1.50/3 | Two prices without labels (cup sizes?). |
| — | "ASP" items (104, 129–131, 216, 217, 252, 253, 256, Thalassery fish biriyani) | ASP | Shown as "ASP — price on request". |
| 384 | Item number used twice | Ensalada Mongo Salad **and** Pancit Canton are both #384 | Card numbering error. |
| 304, 413 | Missing numbers | — | No items 304 or 413 on the card (left as is). |
| — | Grilled section icons | "Served with all grill items" + 4 small icons | Read as hummus, khubz, salad, garlic paste. Please confirm. |

## Spelling corrected for the website (original in brackets)

Flat White (Flate White) · Mocha (Mocca) · Affogato (Afcato) · Cortado (Cortato) ·
Samovar (Samover) · Cold Beverages (Bevarages) · Tabbouleh (Taboulah) · Tom Yum (Tomyum) ·
Hyderabadi (Hyderbadi) · Thalassery (Thalashery) · Lamb Chops (Lampchops) ·
Watermelon Mojito (Watermleon) · Blueberry Avocado Punch (Bluberry) · Chinese Vegetable (Chines) ·
Vegetable Chop Suey (Vegitable) · Sautéed Mixed Vegetables (Sauted) · Nutella Pudding (Nuttella) ·
Herbal Pink Infused Chicken (Herbel) · Beef Chopsuey (Choupsey) · Green Peas Masala (Greanpeas) ·
Butter Naan (Butter Nan) · Jasmine Rice (Jasmin) · Chikoo (Chickoo) · Crab (Carb, in seafood platter).

Filipino names normalised: Daing na Bangus (Dinaing Bangus) · Sinigang na Lapu-Lapu (Lapulapu) ·
Paksiw na Tilapia (Paksiwa na Tilapia) · Paksiw na Bangus (Paksina Bangus) · Pinakbet (Pinabet) ·
Adobong Pusit (Adbong Pusit) · Papaitang Baka (Papitang Baka).

Kept exactly as printed (house names): Zinker, Fransisco, Sherry, Kare Kare Lemon,
Pininyahang, Fried Wanton, Hassan Mathar, Jaget, Abood, Nari Nari, Falak.

Section renamed: the first breakfast list is shown as **"South Indian Breakfast"** (card: "Breakfast")
so it doesn't repeat the "Breakfast" category heading.

## Photos

All food photos are cropped from the menu card itself. A few photos on the card show
dishes that have **no price in the list** (KitKat Milkshake, Snickers Milkshake,
Strawberry Falooda, Blueberry Cheese, Chocolate Fudge, Tender Coconut, Veg Club,
Double Chicken Burger, Fish Chilli, Omelette Poratta). These are **not** listed as menu items.
The card's photos are low resolution; replacing them with original high-resolution
photography will noticeably improve the site.
