/* eslint-disable react/prop-types */

// import { TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  const toyLabels = toyService.getToyLabels()

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target

    if (type === 'select-multiple') {
      value = Array.from(target.selectedOptions, (option) => option.value)
      // console.log('value:', value)
      value = value.filter((val) => val !== '')
    }

    value = type === 'number' ? +value || '' : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { name, inStock, labels } = filterByToEdit

  return (
    <section className='filterBy-container'>
      <legend className='filterBy-legend'>
        {/* Filter By Name */}
        <label htmlFor='name'>
          <input type='text' value={name} name='name' id='name' onChange={handleChange} />
        </label>
        {/* Filter By inStock */}
        <select name='inStock' value={inStock} id='inStock' onChange={handleChange}>
          <option value=''>All</option>
          <option value='true'>In Stock</option>
          <option value='false'>Out of stock</option>
        </select>
        {/* Filter By Multiple Labels */}
        <select multiple name='labels' value={labels || []} onChange={handleChange}>
          <option value=''>Labels</option>
          {toyLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </legend>
    </section>
  )
}
