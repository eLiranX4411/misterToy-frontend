/* eslint-disable react/prop-types */

export function ToySort({ onSetSort, sortBy }) {
  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value

    onSetSort((prevSort) => ({
      ...prevSort,
      [field]: field === 'desc' ? -prevSort.desc : value
    }))
  }
  return (
    <section className='sortBy-container'>
      <select name='type' value={sortBy.type} onChange={handleChange}>
        <option value='name'>Name</option>
        <option value='price'>Price</option>
        <option value='createdAt'>Time</option>
      </select>

      <label>
        <input type='checkbox' name='desc' checked={sortBy.desc < 0} onChange={handleChange} />
        Descending
      </label>
    </section>
  )
}
