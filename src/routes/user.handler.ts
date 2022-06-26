import { Response, Request } from 'express'
import { MyRequest } from '../commons/interfaces/express.interface'
import { DeleteUserDTO } from '../dtos/user.dto'
import { User } from '../models/user.entity'

async function createUser(
  req: Request,
  res: Response
): Promise<Response<null, Record<string, null>>> {
  const {
    dataSource: { userRepo },
    body,
  } = req as MyRequest
  const user = body as User
  await userRepo.insert(user)
  return res.status(201).send()
}

async function getUser(
  req: Request,
  res: Response
): Promise<Response<null, Record<string, null>>> {
  const { userRepo } = (req as MyRequest).dataSource
  const { id: idParam } = req.params
  try {
    const id = parseInt(idParam)
    const users = await userRepo.findOne({ where: { id } })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function listUsers(
  req: Request,
  res: Response
): Promise<Response<null, Record<string, null>>> {
  const { userRepo } = (req as MyRequest).dataSource
  try {
    const users = await userRepo.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deleteUsers(
  req: Request,
  res: Response
): Promise<Response<null, Record<string, null>>> {
  const {
    dataSource: { userRepo },
    body,
  } = req as MyRequest

  try {
    const users = await userRepo.delete((body as DeleteUserDTO).id)
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export const userHandler = { getUser, listUsers, createUser, deleteUsers }
