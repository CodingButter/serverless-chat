/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary()
      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('peerId', 255).notNullable()
      table.timestamps(true, true)
    })
    .createTable('servers', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.timestamps(true, true)
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
    })
    .createTable('channels', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('type', 255).defaultTo('text')
      table.timestamps(true, true)
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('serverId').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('channels')
    .dropTableIfExists('channelTypes')
    .dropTableIfExists('servers')
    .dropTableIfExists('users')
}
