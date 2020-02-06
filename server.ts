import express, {
  json,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import morgan from 'morgan'
import SchemeRouter from './schemes/scheme.router'

const server = express()

const jsonSyntaxErrorHandler = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: 'JSON syntax error' })
  } else {
    next()
  }
}

server.use(morgan('dev'))
server.use(json())
server.use(jsonSyntaxErrorHandler)

server.use('/api/schemes', SchemeRouter)

export default server
