/* eslint-disable react/prop-types */

export function ToySort({ onSetSort, sortBy }) {
  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'checkbox' ? (target.checked ? -1 : 1) : target.value

    // Update the sortBy object directly
    const updatedSort = {
      ...sortBy,
      [field]: value
    }

    // Pass the updated object to onSetSort
    onSetSort(updatedSort)
  }

  return (
    <section className='sortBy-container'>
      <select name='type' value={sortBy.type} onChange={handleChange}>
        <option value='name'>Name</option>
        <option value='price'>Price</option>
        <option value='createdAt'>Time</option>
      </select>

      <label>
        <input type='checkbox' name='desc' checked={sortBy.desc === -1} onChange={handleChange} />
        Descending
      </label>
    </section>
  )
}
