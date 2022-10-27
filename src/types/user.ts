export interface User extends Peer {
  id: number | null
  username: string | null
  loggedIn: boolean
  token: string | null
  publicKey: string | null
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

export type Peer = {
  id: number | null
  username: string | null
  avatar: string | null
  status: string | null
  peerId: string | null
  publicKey: string | null
  lastSeen: string | null
  lastMessage: number | null
  lastMessageContent: string | null
  lastMessageTimestamp: string | null
  lastMessageRecipient: number | null
  totalMessages: number | null
  unreadMessages: number | null
  typing: boolean
}
