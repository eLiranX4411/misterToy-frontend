import { useState } from 'react'

export function useToggle(initialState) {
  const [isOn, setIsOn] = useState(initialState)

  function onToggle() {
    setIsOn((prev) => !prev)
  }

  return [isOn, onToggle]
}

// In component
// const [isStavNice, toggleStav] = useToggle(false)
