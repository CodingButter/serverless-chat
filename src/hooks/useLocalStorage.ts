import { useState } from 'react'

export default function useLocalStorage<Type>(key: string, initialValue: Type) {
  const [storedValue, setStoredValue] = useState<typeof initialValue>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) return JSON.parse(item)
      return initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  function setValue(value: typeof initialValue): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}
