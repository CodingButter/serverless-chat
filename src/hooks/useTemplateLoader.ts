import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { Server, Templates } from '../types/server'

export const useFetchTemplates = (url: string | null) => {
  const { response, error, loading } = useFetch(url)
  const [templates, setTemplates] = useState<Templates | null>(null)

  useEffect(() => {
    if (response) {
      setTemplates(response)
    }
  }, [response])

  return { templates, error, loading }
}

export const mergeTemplates = (defaultTemplate: Partial<Server>, mergingTemplate: Partial<Server>) => {
  const mergedTemplate = {
    name: mergingTemplate.name || '',
    avatar: mergingTemplate.avatar || defaultTemplate.avatar,
    creation_date: mergingTemplate.creation_date || defaultTemplate.creation_date,
    categories: [...(defaultTemplate.categories || []), ...(mergingTemplate.categories || [])],
    channels: [...(defaultTemplate.channels || []), ...(mergingTemplate.channels || [])],
    roles: [...(defaultTemplate.roles || []), ...(mergingTemplate.roles || [])],
    channel_permissions: [
      ...(defaultTemplate.channel_permissions || []),
      ...(mergingTemplate.channel_permissions || [])
    ],
    server_permissions: [...(defaultTemplate.server_permissions || []), ...(mergingTemplate.server_permissions || [])]
  } as Server

  return mergedTemplate
}

export const serverSchema: Server = {
  name: 'Server Name',
  creation_date: Date.now().toString(),
  avatar: '',
  categories: [],
  channels: [],
  roles: [],
  channel_permissions: [],
  server_permissions: []
}
export const useFetchTemplate = (url: string | null) => {
  const filename = url?.split?.('/').pop() || ''
  const { response: templateResponse, error: errorResponse, loading: loadingResponse } = useFetch(url)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any | null>(null)
  const [progress, setProgress] = useState<any | null>(`Downloading ${filename}`)
  const [template, setTemplate] = useState<Server>(serverSchema)

  const fetchExtendedTemplate = async (extUrl: string) => {
    try {
      const file = extUrl.split('/').pop()
      setProgress(`Downloading ${file}`)
      const res = await fetch(extUrl)
      const json = await res.json()
      let tmpTemplate = json
      if (json.extends) {
        const extendedTemplate = await fetchExtendedTemplate(json.extends)
        tmpTemplate = mergeTemplates(json, extendedTemplate)
      }
      return tmpTemplate
    } catch (err: any) {
      setError(err)
    }
    return null
  }

  const buildTemplate = async () => {
    let tmpTemplate = templateResponse
    if (templateResponse.extends) {
      tmpTemplate = (await fetchExtendedTemplate(templateResponse.extends)) as Server
    }
    setProgress(`${filename} downloaded`)
    setLoading(false)
    setTemplate(mergeTemplates(templateResponse, tmpTemplate))
  }

  useEffect(() => {
    if (templateResponse) {
      buildTemplate()
    }
  }, [templateResponse])

  return { template, error, loading, progress }
}
