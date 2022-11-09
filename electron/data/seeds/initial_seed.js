/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const basicTemplate = require('../basic_template')

console.log({ basicTemplate })
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('messages').del().truncate()
  await knex('channel_user_role').del().truncate()
  await knex('channel_role_permissions').del().truncate()
  await knex('channel_roles').del().truncate()
  await knex('server_user').del().truncate()
  await knex('server_role_permissions').del().truncate()
  await knex('roles').del().truncate()
  await knex('server_user_role').del().truncate()
  await knex('permissions').del().truncate()
  await knex('channels').del().truncate()
  await knex('channelTypes').del().truncate()
  await knex('categories').del().truncate()
  await knex('servers').del().truncate()
  await knex('users').del().truncate()

  // Inserts seed entries
  await knex('users').insert(basicTemplate.users)
  await knex('servers').insert(basicTemplate.servers)
  await knex('server_user').insert(basicTemplate.servers.map((_, index) => ({ serverId: index + 1, userId: 1 })))
}
