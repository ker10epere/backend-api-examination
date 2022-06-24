import { Response, Request } from 'express'
import { MyRequest } from '../commons/interfaces/express.interface'
import { User } from '../models/user.entity'

async function createUser(req: Request, res: Response): Promise<any> {
  const {
    dataSource: { userRepo },
    body,
  } = req as MyRequest
  const user = body as User
  await userRepo.insert(user)
  return res.status(201).send()
}

async function listUser(req: Request, res: Response) {
  const {
    dataSource: { userRepo },
    body,
  } = req as MyRequest
  const users = await userRepo.find()
  return res.status(200).json(users)
}

export const userHandler = { listUser, createUser }
