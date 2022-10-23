/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('servers').del()
  await knex('channels').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, username: 'jamie', password: 'password', peerId: '748181e7-ad8d-5d4e-9382-035edbc075dc' }
  ])
  await knex('servers').insert([{ id: 1, name: 'BeastCraft', userId: 1 }])
  await knex('channels').insert([
    { id: 1, name: 'rules', serverId: 1, type: 'text', userId: 1 },
    { id: 2, name: 'info', serverId: 1, type: 'text', userId: 1 }
  ])
}
