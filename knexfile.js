// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const databases = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/local.db3'
    },
    seeds: {
      directory: './data/seeds'
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  }
}
module.exports = databases
