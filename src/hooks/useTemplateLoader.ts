import { Server, Templates } from '../types/server'
import useFetchJson from './useFetchJson'

interface MergeTemplateProps {
  defaultTemplate: Partial<Server>
  mergingTemplate: Partial<Server>
}

export const mergeTemplates = ({ defaultTemplate, mergingTemplate }: MergeTemplateProps) => {
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

export async function useFetchTemplates({ url }: { url: string }) {
  const templates = await useFetchJson<Promise<Templates>>(url)
  return templates
}

export async function useFetchTemplate({ url, template }: { url: string; template?: Server }) {
  const serverTemplate = await useFetchJson<Promise<Server>>(url)
  const serverTemplateResponse = (
    serverTemplate?.extends
      ? mergeTemplates({
          defaultTemplate: (await useFetchTemplate({
            url: serverTemplate.extends,
            template
          })) as Server,
          mergingTemplate: serverTemplate
        })
      : serverTemplate
  ) as Server
  return serverTemplateResponse
}
