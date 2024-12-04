export function ToyPreview({ toy }) {
  return (
    <section className='toy-preview'>
      <h2>{toy.name}</h2>
      <h3>{toy.price}</h3>
    </section>
  )
}
