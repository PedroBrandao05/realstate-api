import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const port = Number(process.env.DB_PORT)

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port,
    database: process.env.DB_NAME
})

connection.connect()

export default connection