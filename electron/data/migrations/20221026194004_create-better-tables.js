/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary()
      table.string('username', 255).notNullable()
      table.string('avatar', 255).nullable()
      table.string('publicKey', 255).notNullable()
      table.string('privateKey', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('peerId', 255).unique().notNullable()
      table.timestamps(true, true)
    })
    .createTable('servers', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('avatar', 255).nullable()
      table.timestamps(true, true)
      table
        .string('ownerPeerId')
        .unique()
        .unsigned()
        .notNullable()
        .references('peerId')
        .inTable('users')
        .onDelete('CASCADE')
    })
    .createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.timestamps(true, true)
    })
    .createTable('channelTypes', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.timestamps(true, true)
    })
    .createTable('channels', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.integer('position').notNullable()
      table.timestamps(true, true)
      table.integer('categoryId').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('serverId').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE')
    })
    .createTable('permissions', (table) => {
      table.increments('id').primary()
      table.string('label', 255).notNullable()
      table.string('name', 255).notNullable()
      table.integer('level').defaultTo(0)
      table.timestamps(true, true)
    })
    .createTable('roles', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('avatar', 255).nullable()
      table.string('description', 255).nullable()
      table.string('color', 255).notNullable()
      table.integer('serverId').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('server_role_permissions', (table) => {
      table.increments('id').primary()
      table.string('description', 255).nullable()
      table.string('permissionId').unsigned().notNullable().references('id').inTable('permissions').onDelete('CASCADE')
      table.string('roleId').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('server_user', (table) => {
      table.increments('id').primary()
      table.integer('serverId').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE')
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('server_user_role', (table) => {
      table.increments('id').primary()
      table.integer('serverId').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE')
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('roleId').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('channel_roles', (table) => {
      table.increments('id').primary()
      table.integer('channelId').unsigned().notNullable().references('id').inTable('channels').onDelete('CASCADE')
      table.integer('roleId').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE')
    })
    .createTable('channel_role_permissions', (table) => {
      table.increments('id').primary()
      table.string('permissionId').unsigned().notNullable().references('id').inTable('permissions').onDelete('CASCADE')
      table.string('roleId').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('channel_user_role', (table) => {
      table.increments('id').primary()
      table.integer('channelId').unsigned().notNullable().references('id').inTable('channels').onDelete('CASCADE')
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('roleId').unsigned().notNullable().references('id').inTable('roles').onDelete('CASCADE')
    })
    .createTable('messages', (table) => {
      table.increments('id').primary()
      table.string('content', 255).notNullable()
      table.string('hashStamp', 255).notNullable()
      table.string('type', 255).notNullable()
      table.string('attachment', 255).nullable()
      table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('channelId').unsigned().notNullable().references('id').inTable('channels').onDelete('CASCADE')
      table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('channel_user_role')
    .dropTableIfExists('channel_role_permissions')
    .dropTableIfExists('channel_roles')
    .dropTableIfExists('server_user')
    .dropTableIfExists('server_role_permissions')
    .dropTableIfExists('roles')
    .dropTableIfExists('server_user_role')
    .dropTableIfExists('permissions')
    .dropTableIfExists('channels')
    .dropTableIfExists('channelTypes')
    .dropTableIfExists('categories')
    .dropTableIfExists('servers')
    .dropTableIfExists('users')
}
