// Dish photo helper. All photos come from the restaurant's own menu card.
// `size="thumb"` uses the 360px versions, otherwise the 720px versions.
export default function Img({ name, alt, size = 'full', eager = false, className = '', ...rest }) {
  const dir = size === 'thumb' ? 'thumbs' : 'dishes'
  return (
    <img
      src={`/images/${dir}/${name}.webp`}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      className={className}
      {...rest}
    />
  )
}
