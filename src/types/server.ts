type Category = {
  id: string
  name: string
  description: string
  position: number
}

type Role = {
  id: string
  name: string
  avatar: string | null
  description: string
  color: string
  extends: string | null
  default_permissions: string[]
  additional_permissions: string[]
  denied_permissions: string[]
}
type Permission = {
  id: string
  name: string
  description: string
}

type Channel = {
  name: string
  avatar: string
  description: string
  type: string
  position: number
  category: string
  roles: Role[]
  default_permissions: string[]
}

export type Server = {
  name: string | null | undefined
  creation_date: string | null | undefined
  avatar: string | null | undefined
  categories: Category[]
  channels: Channel[]
  roles: Role[]
  channel_permissions: Permission[]
  server_permissions: Permission[]
}

export type ServerTemplate = {
  label: string
  icon: string | null
  description: string
  template_path: string
}

export type Templates = {
  default_template: ServerTemplate
  additional_templates: ServerTemplate[]
}
