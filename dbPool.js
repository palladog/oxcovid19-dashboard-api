import env from './env.js'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: env.pg_user,
    host: env.pg_host,
    database: env.pg_database,
    password: env.pg_password,
    port: env.pg_port
})

export default pool