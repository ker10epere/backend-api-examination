import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user.entity'
import { ErrorMessage, isError } from '../interfaces/error.interface'
import { MyRequest } from '../interfaces/express.interface'
import { UserPayload } from '../interfaces/jwt.interface'
import { verifyAuth, parseTokenFromBearer } from '../utils/jwt.util'
import { isTypePresent } from '../utils/type-checker.util'

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const myreq = req as MyRequest
  const { authorization } = myreq.headers

  if (!isTypePresent(authorization)) {
    res.status(401).send()
    return
  }

  const userPayload = verifyAuth(myreq)

  if (isError(userPayload)) {
    res.status(401).send()
    return
  }

  const foundUser = await findUser(userPayload, myreq)
  if (!foundUser || isError(foundUser)) {
    res.status(401).send()
    return
  }

  myreq.user = foundUser

  next()
}

const findUser = async (
  userPayload: UserPayload,
  { dataSource: { userRepo }, headers: { authorization } }: MyRequest
): Promise<User | ErrorMessage | null> => {
  if (!isTypePresent<string>(authorization)) {
    return { error: 'authorization undefined' }
  }

  try {
    const foundUser = await userRepo.findOneBy({
      token: parseTokenFromBearer(authorization),
      username: userPayload.username,
    })
    return foundUser
  } catch (error) {
    return {
      error,
    }
  }
}
export { auth }
