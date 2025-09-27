import dotenv from 'dotenv'
dotenv.config() // вызываем сразу

console.log('DB_USER:', process.env.DB_USER)

const USER = process.env.DB_USER
const HOST = process.env.DB_HOST
const DATABASE = process.env.DB_NAME
const PASSWORD = process.env.DB_PASSWORD
const PORT_DB = Number(process.env.DB_PORT)
const PORT = Number(process.env.PORT) || 3000

export default { USER, HOST, DATABASE, PASSWORD, PORT_DB, PORT }
