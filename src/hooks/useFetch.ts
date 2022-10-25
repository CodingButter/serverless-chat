import { useEffect, useState } from 'react'

const useFetch = (url: string, options?: any) => {
  const [response, setResponse] = useState<any | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

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

export default useFetch
