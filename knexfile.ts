const development = {
  client: 'sqlite3',
  useNullAsDefault: true, // needed for sqlite
  connection: {
    filename: './data/schemes.db3',
  },
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  // add the following
  pool: {
    afterCreate: (
      conn: { run: (option: string, cb: () => void) => void },
      done: () => void
    ): void => {
      // runs after a connection is made to the sqlite engine
      conn.run('PRAGMA foreign_keys = ON', done) // turn on FK enforcement
    },
  },
}

export default development
