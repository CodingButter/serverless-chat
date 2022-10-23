export type Channel = {
  id: number
  type: string
  name: string
}

export type Server = {
  name: string
  channels?: Channel[]
}

export type User = {
  id: number
  username: string
  peerId: string
  servers?: Server[]
}
