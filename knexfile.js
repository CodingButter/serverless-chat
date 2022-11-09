const { join } = require('path')
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const databases = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, './electron/data/local.db3')
    },
    seeds: {
      directory: join(__dirname, './electron/data/seeds')
    },
    migrations: {
      directory: join(__dirname, './electron/data/migrations')
    },
    useNullAsDefault: true
  }
}
module.exports = databases
