import dotenv from 'dotenv'
import pgPromise from 'pg-promise'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
}

const connection = async () => {
  const postgre = pgPromise({})
  const db = postgre(config)
  db.connect().then(() => console.log('Connected to database')).catch((err) => {console.log(err)})
  return db;
}

export const disconnect = async (
    db: pgPromise.IDatabase<any, any>
  ): Promise<void> => {
    await db.$pool.end()
  }

export default connection