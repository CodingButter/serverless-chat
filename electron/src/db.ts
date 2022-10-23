import knex from 'knex'
import getUuid from 'uuid-by-string'
import databases from '../../knexfile'

const databaseInfo = databases.development
const db = knex(databaseInfo)
const methods: any = {}

methods.register = async (username: string, password: string) => {
  const userRecord = await db('users').where({ username }).first()
  if (userRecord) {
    return false
  }
  const peerId = getUuid(`${username}${password}`) as string
  const [id] = await db('users').insert({ username, password, peerId })
  const [user] = await db.select('id', 'username', 'peerId').from('users').where({ id })
  return user
}

methods.login = async (username: string, password: string) => {
  const user = await db.select('id', 'username', 'peerId').from('users').where({ username, password }).first()
  if (!user) {
    return false
  }
  return user
}

methods.getUser = async (id: number) => {
  const user = await db.select('id', 'username', 'peerId').from('users').where({ id }).first()
  if (!user) return false
  return user
}

methods.getServers = async (userId: number) => {
  const servers = await db.select('id', 'name').from('servers').where({ userId })
  return servers
}

methods.getServer = async (userId: number, id: number) => {
  const server = await db.select('id', 'name').from('servers').where({ id, userId }).first()
  return server
}

methods.getChannels = async (userId: number, serverId: number) => {
  const channels = await db.select('id', 'name', 'type').from('channels').where({ serverId, userId })
  return channels
}

methods.getChannel = async (userId: number, serverId: number, id: number) => {
  const channel = await db.select('id', 'name', 'type').from('channels').where({ id, userId, serverId }).first()
  return channel
}

export default methods
