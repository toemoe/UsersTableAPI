import { info, error } from './logger.js'

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'this endpoint unknown' })
}

const errorHandler = (request, response, next) => {
  error(error.message)
  next(error)
}

export { requestLogger, unknownEndpoint, errorHandler }