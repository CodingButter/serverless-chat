import React, { useEffect, useState } from 'react'
import shortHash from 'short-hash'
import { Peer, DataConnection } from 'peerjs'
import { User } from './useUserManager'

export type Channel = {
  name: string
  password: string
  avatar: string
  users: User[]
}

export type ServerSettings = {
  avatar: string
}

export type Server = {
  name: string
  users: User[]
  channels: Channel[]
  ServerSettings: ServerSettings
}

interface Data {
  type: string
  server?: string
  channel?: string
}

const PeerManager = (userData: User) => {
  const [connections, setConnections] = useState<User[]>([])
  const ourId = shortHash(`${userData.name}${userData.password}`)
  const peer = new Peer(ourId)

  const receiveData = (data: Data): any => {
    let response: any = {}
    switch (data.type) {
      case 'server':
        response = userData?.servers?.find((server: Server) => server.name === data?.server?.name) || null
        break
      case 'channels':
        response = userData?.servers?.find?.((server: Server) => server?.name === data?.server)?.channels || []
        break
      case 'channel':
        response =
          userData?.servers
            ?.find((server) => server.name === data?.server)
            ?.channels?.find((channel) => channel.name === data?.channel) || null
        break
      default:
    }
    return response
  }
  const addPeerConnection = (peerId: string): any => {
    if (connections.find((user) => user.peerId === peerId)) return
    const connection = peer.connect(peerId)
    connection.on('open', () => {
      connection.on('data', (data: any) => {
        const jsonData = JSON.parse(data) as Data
        receiveData(jsonData)
      })
      setConnections([...connections, { peerId, connection }])
    })
  }
  const addServer = (serverName: string, peerId: string) => {
    const server: Server = {
      name: serverName,
      channels: [],
      users: [{ peerId }],
      ServerSettings: { avatar: '' }
    }
    return server
  }

  const getServerChannels = (serverName: string) => {}

  return { addServer }
}
