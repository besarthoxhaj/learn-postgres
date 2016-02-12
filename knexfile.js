module.exports = {
  test: {
    client: 'pg',
    debug: process.env.PG_DEBUG || false,
    connection: {
      database: 'knex_test',
    },
    migrations: {
      directory: './test/migrations',
      tableName: 'testing_migrations',
    },
    seeds: {
      directory: './test/seeds',
    }
  }
};
