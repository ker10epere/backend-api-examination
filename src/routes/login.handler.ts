import { Response, Request } from 'express'
import { MyRequest } from '../commons/interfaces/express.interface'
import { generateUserToken } from '../commons/utils/jwt.util'

async function login(req: Request, res: Response) {
  const {
    dataSource: { userRepo },
    body: { username, password },
  } = req as MyRequest

  const foundUser = await userRepo.findOne({
    where: {
      username,
    },
  })

  if (!foundUser) {
    res.status(400).send({ message: 'user not found' })
    return
  }

  if (!(await foundUser.comparePassword(password))) {
    res.status(400).send({ message: 'invalid password' })
    return
  }

  const token = generateUserToken(username)

  await userRepo.update({ id: foundUser.id }, { token })
  await res.status(200).send({ token })

  return
}
export const loginHandler = { login }
