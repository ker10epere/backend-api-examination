import { Response, Request } from 'express'
import { MyRequest } from '../commons/interfaces/express.interface'
import { DeleteUserDTO, EditUserDTO } from '../dtos/user.dto'
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

async function editUser(req: Request, res: Response): Promise<unknown> {
  const {
    dataSource: { userRepo },
    body,
  } = req as MyRequest

  const userBody = body as EditUserDTO

  const foundUser = await userRepo.findOne({
    where: {
      id: userBody.id,
    },
  })

  if (!foundUser) {
    res.status(400).send({ error: 'no user found to update' })
    return
  }
  try {
    const userToSave = userRepo.create(userBody)
    await userRepo.save(userToSave)
  } catch (error) {
    res.status(400).send({ error })
    return
  }

  res.status(200).send()
  return
}

async function getUser(req: Request, res: Response): Promise<unknown> {
  const { userRepo } = (req as MyRequest).dataSource
  const { id: idParam } = req.params
  try {
    if (!idParam.match(/^\d$/)) {
      return res.status(400).send({ error: 'param not a valid number' })
    }
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

export const userHandler = {
  getUser,
  listUsers,
  createUser,
  editUser,
  deleteUsers,
}
