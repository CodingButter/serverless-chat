export type User = {
  id: number
  username: string
  peerId: string
  avatar: string | null
  privateKey?: string | null
  publicKey?: string | null
}

export type Category = {
  id: string
  name: string
  description: string
  position: number
}

export type Role = {
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

export type Permission = {
  id: string
  name: string
  description: string
}

export type Channel = {
  id: number
  name: string
  avatar: string
  description: string
  type: string
  position: number
  categoryId: number
  roles: Role[]
  default_permissions: string[]
}

export type Server = {
  id: number
  name: string | null | undefined
  creation_date: string | null | undefined
  avatar: string | null | undefined
  categories: Category[]
  extends?: string
  channels: Channel[]
  owner: User
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
