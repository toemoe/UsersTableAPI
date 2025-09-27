import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const USER = process.env.DB_USER
const HOST = process.env.DB_HOST
const DATABASE = process.env.DB_NAME
const PASSWORD = process.env.DB_PASSWORD
const PORT_DB = process.env.DB_PORT

export default { USER, DATABASE, PASSWORD, PORT, HOST, PORT_DB }