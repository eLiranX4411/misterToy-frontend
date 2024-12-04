import { useEffect, useState } from 'react'

export function useForm(initialState, callBack) {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    callBack?.(fields)
  }, [fields])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
    }

    setFields((prevFields) => ({
      ...prevFields,
      [field]: value
    }))
  }

  function register(field, type = '') {
    return {
      type,
      name: field,
      id: field,
      onChange: handleChange,
      value: fields[field]
    }
  }

  return [register, fields, setFields]
}

// --- in component ---
// export function FilterTest() {
//   const [register, fields] = useForm(
//     { txt: '', price: 0, sortDir: true },
//     console.log
//   )
//   return (
//     <form>
//       <input {...register('txt', 'text')} />
//       <input {...register('price', 'number')} />
//       <input {...register('sortDir', 'checkbox')} />
//     </form>
//   )
// }
