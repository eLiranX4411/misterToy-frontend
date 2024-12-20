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
      const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
      value = selectedOptions.filter((val) => val !== '')
    } else {
      value = type === 'number' ? +value || '' : value
    }

    setFilterByToEdit((prevFilter) => {
      if (field === 'labels') {
        const newLabels = Array.from(new Set([...prevFilter.labels, ...value])) // Avoid duplicates
        return { ...prevFilter, [field]: newLabels }
      }
      return { ...prevFilter, [field]: value }
    })
  }

  function resetFilter(ev) {
    ev.preventDefault()
    const defaultFilter = toyService.getDefaultFilter()
    setFilterByToEdit(defaultFilter)
  }

  const { name, inStock, labels } = filterByToEdit

  // console.log(filterByToEdit)
  // console.log(`filterBy :`, filterBy)

  return (
    <section className='filterBy-container'>
      <form className='filterBy-legend'>
        {/* Filter By Name */}
        <label htmlFor='name'>
          <input type='text' value={name} name='name' id='name' onChange={handleChange} />
        </label>
        {/* Filter By inStock */}
        <select name='inStock' value={inStock} id='inStock' onChange={handleChange}>
          <option value='all'>All</option>
          <option value='inStock'>In Stock</option>
          <option value='outOfStock'>Out of stock</option>
        </select>
        {/* Filter By Multiple Labels */}
        <select
          className='labels'
          multiple
          name='labels'
          value={labels || []}
          onChange={handleChange}
        >
          {toyLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <button className='label-reset' onClick={resetFilter}>
          Reset Filter
        </button>
      </form>
    </section>
  )
}
