import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useNavigate, useParams } from 'react-router-dom'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  })

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToyToEdit(toy)
    } catch (err) {
      console.log(`Cannot load Toy`, err)
    }
  }

  async function onSaveToy(ev) {
    ev.preventDefault()
    try {
      await saveToy(toyToEdit)
      showSuccessMsg(`Saving toy Sucessfully!`)
      navigate(`/toy`)
    } catch (err) {
      console.log(`Cannot save Toy`, err)
      showErrorMsg(`Cannot save Toy`)
    }
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case `number`:
        value = +value
        break

      case `checkbox`:
        value = target.checked
        break

      default:
        break
    }

    setToyToEdit((prevToyToEdit) => ({ ...prevToyToEdit, [field]: value }))
  }

  function handleLabelChange({ target }) {
    const label = target.name
    const isChecked = target.checked

    setToyToEdit((prevToyToEdit) => {
      const updatedLabels = isChecked
        ? [...prevToyToEdit.labels, label]
        : prevToyToEdit.labels.filter((lbl) => lbl !== label)

      return { ...prevToyToEdit, labels: updatedLabels }
    })
  }

  const labels = toyService.getToyLabels()
  const { name = '', price = 0, labels: toyLabels = [] } = toyToEdit

  // console.log(toyToEdit)

  return (
    <section className='toy-edit-container'>
      <form className='toy-edit-form' onSubmit={onSaveToy}>
        {/* Name Input */}
        <label htmlFor='name'>
          <input
            type='text'
            value={name}
            name='name'
            id='name'
            onChange={handleChange}
            placeholder='Toy Name'
            required
          />
        </label>

        {/* Price Input */}
        <label htmlFor='price'>
          <input
            type='number'
            value={price}
            name='price'
            id='price'
            placeholder='Toy Price'
            onChange={handleChange}
            required
          />
        </label>

        {/* Labels Checkbox */}
        <label htmlFor='labels'>
          Choose Label:
          {labels.map((label, idx) => (
            <div className='labels' key={idx}>
              <input
                type='checkbox'
                checked={toyLabels.includes(label)}
                name={label}
                id={label}
                onChange={handleLabelChange}
              />
              <label htmlFor={label}>{label}</label>
            </div>
          ))}
        </label>

        <button type='submit'>{toyToEdit._id ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
