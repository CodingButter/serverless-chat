import React, { useState, useEffect } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(document.body)
    updateSize()
    return () => resizeObserver.disconnect()
  }, [])
  return size
}
