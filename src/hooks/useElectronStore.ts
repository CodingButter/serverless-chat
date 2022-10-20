import { useState, useEffect } from 'react'

const useElectronStore = (key: string, initialValue: any): any[] => {
  const [storedValue, setStoredValue] = useState(initialValue)

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.Main.setItem(key, valueToStore)
      console.log(`Stored ${key} in Electron Store as \n${JSON.stringify(valueToStore, null, 4)}`)
    } catch (error) {
      console.error(error)
    }
  }

  const updateValueFromStore = async () => {
    const value = await window.Main.getItem(key)
    console.log(value)
    if (value) setValue(value)
  }

  useEffect(() => {
    updateValueFromStore()
  }, [initialValue])

  return [storedValue, setValue]
}

export default useElectronStore
