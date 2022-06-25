import { Request, Response, NextFunction } from 'express'
import { isError } from '../interfaces/error.interface'
import { MyRequest } from '../interfaces/express.interface'
import { verifyAuth, parseTokenFromBearer } from '../utils/jwt.util'

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const myreq = req as MyRequest
  const { authorization } = myreq.headers

  if (typeof authorization === 'undefined') {
    res.status(401).send()
    return
  }

  const userPayload = verifyAuth(myreq)

  if (isError(userPayload)) {
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

  myreq.user = foundUser

  next()
}
