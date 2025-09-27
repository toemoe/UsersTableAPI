import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usersRouter from './routes/users.js'
import groupsRouter from './routes/groups.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'

dotenv.config()

const app = express()
app.use(requestLogger)
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the API!'
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)

export default app