import { Request, Response, NextFunction, RequestHandler } from 'express'
import { DataSource } from 'typeorm'
import { User } from '../../models/user.entity'
import { MyRequest } from '../interfaces/express.interface'

export const dataSourceProvider = (dataSource: DataSource): RequestHandler => {
  const userRepo = dataSource.getRepository(User)

  return (req: Request, res: Response, next: NextFunction) => {
    const myreq = req as MyRequest

    myreq.dataSource = {
      userRepo,
    }

    next()
  }
}
