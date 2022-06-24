import { Request, Response, NextFunction } from 'express'
import { MyRequest } from '../interfaces/express.interface'
import {
  verifyAuth,
  parseTokenFromBearer,
  generateUserToken,
} from '../utils/jwt.util'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const myreq = req as MyRequest
  const { authorization } = myreq.headers

  if (typeof authorization === 'undefined') {
    res.status(401).send()
    return
  }

  const userPayload = verifyAuth(myreq)
  if (userPayload === null || typeof userPayload === 'string') {
    res.status(401).send()
    return
  }

  const userRepo = myreq.dataSource.userRepo

  const foundUser = await userRepo.findOneBy({
    token: parseTokenFromBearer(authorization),
    username: userPayload.username,
  })

  if (!foundUser) {
    res.status(401).send()
    return
  }

  // const { id, username } = foundUser

  // const newToken = generateUserToken(username)

  // userRepo.update({ id }, { token: newToken })
  myreq.user = foundUser

  next()
}
