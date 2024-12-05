/* eslint-disable react/prop-types */

// const roboHashBaseUrl = `https://robohash.org/${toy._id}?set=set4`

export function ToyPreview({ toy }) {
  return (
    <section className='toy-preview'>
      <img className='toy-img' src={`https://robohash.org/${toy._id}?set=set4`} alt='Toy Img' />
      <h2>{toy.name}</h2>
      <h3>${toy.price}</h3>
      <h3>{toy.inStock ? `Last units in stock` : `Out of stock`}</h3>
      <ul className='labels'>
        <strong>labels:</strong>
        {toy.labels.map((label, idx) => (
          <li key={idx}>{label}</li>
        ))}
      </ul>
    </section>
  )
}
