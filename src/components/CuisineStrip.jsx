// Cuisines as printed on the menu card cover, plus the other kitchens the menu covers.
const items = ['Yemen Mandi', 'Charcoal Grills', 'Indian', 'Kerala Thani Nadan', 'Chinese', 'Filipino', 'Continental', 'Shawarma', 'Fresh Juices']

export default function CuisineStrip() {
  const row = [...items, ...items]
  return (
    <div className="strip" role="presentation">
      <div className="strip-track">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length}>
            {t}
            <i className="strip-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
