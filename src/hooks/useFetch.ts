import { useEffect, useState } from 'react'

const useFetch = (url: string, options: any) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setResponse(json)
        setLoading(false)
      } catch (err: any) {
        setError(err)
      }
    }

    fetchData()
  }, [])

  return { response, error, loading }
}
