/* eslint-disable camelcase */
import knex from 'knex'
import getUuid from 'uuid-by-string'
import databases from '../../knexfile'
import { generateKeyPair } from './utils/enc'
import * as ServerTypes from './types/custom'

const databaseInfo = databases.development
const db = knex(databaseInfo)
const methods: any = {}

methods.register = async (username: string, password: string) => {
  const { publicKey, privateKey } = generateKeyPair()

  const userRecord = await db('users').where({ username }).first()
  if (userRecord) {
    return false
  }
  const peerId = getUuid(`${username}${password}`) as string
  const [id] = await db('users').insert({ username, password, peerId, publicKey, privateKey })
  const [user] = await db.select('id', 'username', 'peerId', 'publicKey', 'privateKey').from('users').where({ id })
  return user as ServerTypes.User
}

methods.login = async (username: string, password: string) => {
  const user = await db.select('id', 'username', 'peerId').from('users').where({ username, password }).first()
  if (!user) {
    return false
  }
  return user as ServerTypes.User
}

methods.getUser = async (id: number) => {
  const user = await db.select('id', 'username', 'peerId').from('users').where({ id }).first()
  if (!user) return false
  return user as ServerTypes.User
}

methods.getUserPublicKey = async (id: number) => {
  const user = await db.select('publicKey').from('users').where({ id }).first()
  if (!user) return false
  return user.publicKey as string
}

methods.getUserPrivateKey = async (id: number) => {
  const user = await db.select('privateKey').from('users').where({ id }).first()
  if (!user) return false
  return user.privateKey as string
}

methods.getServers = async (userId: number) => {
  const servers = await db
    .from('server_user')
    .innerJoin('servers', 'server_user.serverId', 'servers.id')
    .where('server_user.userId', userId)
  return servers as ServerTypes.Server[]
}

methods.getServer = async (id: number) => {
  const server = await db.select('id', 'name', 'created_at', 'avatar').from('servers').where({ id }).first()
  if (!server) return false
  return server as ServerTypes.Server
}

methods.getServerByName = async (userId: number, name: string) => {
  const server = await db
    .select(
      'id',
      'name',
      'creation_date',
      'avatar',
      'categories',
      'extends',
      'channels',
      'roles',
      'channel_permissions',
      'server_permissions'
    )
    .from('servers')
    .where({ userId, name })
    .first()
  if (!server) return false
  return server as ServerTypes.Server
}

methods.getServerChannels = async (id: number, serverId: number) => {
  const channels = await db
    .select('id', 'name', 'avatar', 'description', 'type', 'position', 'category', 'roles', 'default_permissions')
    .from('channels')
    .where({ serverId, id })
  return channels as ServerTypes.Channel[]
}

methods.getServerRoles = async (id: number, serverId: number) => {
  const roles = await db
    .select(
      'id',
      'name',
      'avatar',
      'description',
      'color',
      'extends',
      'default_permissions',
      'additional_permissions',
      'denied_permissions'
    )
    .from('roles')
    .where({ serverId, id })
  return roles as ServerTypes.Role[]
}

methods.getServerChannelPermissions = async (id: number, serverId: number) => {
  const permissions = await db.select('id', 'name', 'description').from('roles').where({ serverId, id })
  return permissions as ServerTypes.Permission[]
}

methods.getServerPermissions = async (id: number, serverId: number) => {
  const permissions = await db.select('id', 'name', 'description').from('roles').where({ serverId, id })
  return permissions as ServerTypes.Permission[]
}

methods.getServerCategories = async (id: number, serverId: number) => {
  const categories = await db.select('id', 'name', 'description', 'position').from('categories').where({ serverId, id })
  return categories as ServerTypes.Category[]
}

methods.getServerUsers = async (serverId: number) => {
  const users = await db.select('id', 'username', 'peerId', 'publicKey').from('users').where({ serverId })
  return users as ServerTypes.User[]
}

export default methods
