export type User = {
  id: number | null
  username: string | null
  loggedIn: boolean
  token: string | null
}
export type Server = {
  id: number | null
  userId: number | null
  name: string | null
}
export type Channel = {
  id: number | null
  serverId: number | null
  name: string | null
  userId: number | null
}

export type UserState = {
  selectedServer: number | null
  selectedChannel: number | null
}
