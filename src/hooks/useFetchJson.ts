import md5 from 'fast-md5'
import ms from 'ms'

const cacheStore = new Map()
const refetchIntervalStore = new Map()

interface FetchJsonOptions {
  cache?: boolean
  refetchInterval?: string
  options?: any
}

async function fetchData<TResponse>(url: string, { ...options }: FetchJsonOptions = {}) {
  const response = await fetch(url, options as any)
  const json = await response.json()
  return json as Promise<TResponse>
}

export default async function useFetchJson<TResponse>(
  url: string,
  { cache = true, refetchInterval, ...options }: FetchJsonOptions = {}
) {
  const hashKey = md5(`${url}${JSON.stringify(options)}`)
  const lastFetched = refetchIntervalStore.get(hashKey) || 0
  if (cache && cacheStore.has(hashKey)) {
    if ((refetchInterval && Date.now() - lastFetched < ms(refetchInterval)) || !refetchInterval) {
      return cacheStore.get(hashKey) as Promise<TResponse>
    }
  }
  refetchIntervalStore.set(hashKey, Date.now())
  const response = fetchData<Promise<TResponse>>(url, { ...options } as any)
  cacheStore.set(hashKey, response)
  refetchIntervalStore.set(hashKey, Date.now())
  return response
}
