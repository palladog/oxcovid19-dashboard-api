import dotenv from 'dotenv'

dotenv.config()

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    pg_host: process.env.PG_HOST,
    pg_port: process.env.PG_PORT,
    pg_database: process.env.PG_DATABASE,
    pg_user: process.env.PG_USER,
    pg_password: process.env.PG_PASSWORD
}