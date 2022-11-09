import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

const getRequestType = (endpoint: string) => {
  switch (endpoint.split('/')[1]) {
    case 'login':
      return 'POST'
    case 'logout':
      return 'GET'
    case 'register':
      return 'POST'
    case 'create':
      return 'POST'
    case 'read':
      return 'GET'
    case 'update':
      return 'PUT'
    case 'delete':
      return 'DELETE'
    default:
      return 'GET'
  }
}

export const fetchData = async (endpoint: string, payload?: any, jwt?: string, formData = false) => {
  const apiAddress = await window.Main.getServerAddress()
  const method = getRequestType(endpoint)
  const headers = {} as any
  if (!formData) {
    headers['Content-Type'] = 'application/json'
  }
  headers.Authorization = `Bearer ${jwt}`
  const response = await fetch(`${apiAddress}${endpoint}`, {
    method,
    headers,
    body: payload
  })
  return response.json()
}

const useApi = (endpoint: string, payload?: any) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [response, setResponse] = useState<any>(null)

  const handleFetchData = async () => {
    try {
      const res = await fetchData(endpoint, payload && JSON.stringify(payload), user.token)
      setResponse(res)
      setLoading(false)
    } catch (err: any) {
      setError(err)
    }
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return { loading, error, response }
}
export default useApi
