import { useEffect, useState } from 'react'
import useFetch from './useFetch'

export const useFetchTemplates = (url: string) => {
  const { response, error, loading } = useFetch(url)
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    if (response) {
      setTemplates(response)
    }
  }, [response])

  return { templates, error, loading }
}

export const useFetchTemplate = (url: string) => {
  const filename = url.split('/').pop()
  const { response: templateResponse, error: errorResponse, loading: loadingResponse } = useFetch(url)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any | null>(null)
  const [progress, setProgress] = useState<any | null>(`Downloading ${filename}`)
  const [template, setTemplate] = useState([])

  const fetchExtendedTemplate = async (extUrl: string) => {
    try {
      const file = extUrl.split('/').pop()
      setProgress(`Downloading ${file}`)
      const res = await fetch(extUrl)
      const json = await res.json()
      let tmpTemplate = json
      if (json.extends) {
        const extendedTemplate = await fetchExtendedTemplate(json.extends)
        tmpTemplate = { ...extendedTemplate, ...json }
      }
      return tmpTemplate
    } catch (err: any) {
      setError(err)
    }
    return null
  }

  const buildTemplate = async () => {
    const tmpTemplate = await fetchExtendedTemplate(url)
    setProgress(`${filename} downloaded`)
    setLoading(false)
    setTemplate({ ...tmpTemplate, ...templateResponse })
  }

  useEffect(() => {
    if (templateResponse) {
      buildTemplate()
    }
  }, [templateResponse])

  return { template, error, loading, progress }
}
