import { compare } from 'bcryptjs'
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

  if (!(await compare(password, foundUser.password))) {
    res.status(400).send({ message: 'invalid password' })
    return
  }

  const token = generateUserToken(username)

  userRepo.update({ id: foundUser.id }, { token })
  res.json({ token })
}
export { login }
