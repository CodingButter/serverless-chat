export type User = {
  id: number | null
  username: string | null
  loggedIn: boolean
  token: string | null
}
export type Server = {
  id: number
  userId: number
  name: string
}
export type Channel = {
  id: number
  serverId: number
  name: string
  userId: number
}

export type UserState = {
  selectedServer: number | null
  selectedChannel: number | null
}
