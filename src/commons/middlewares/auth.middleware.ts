import { Request, Response, NextFunction, RequestHandler } from 'express'
import { Repository } from 'typeorm'
import { AdminId } from '../../models/admin-id.entity'
import { User } from '../../models/user.entity'
import { ErrorMessage, isError } from '../interfaces/error.interface'
import { MyRequest } from '../interfaces/express.interface'
import { UserPayload } from '../interfaces/jwt.interface'
import { verifyAuth, parseTokenFromBearer } from '../utils/jwt.util'
import { isTypePresent } from '../utils/type-checker.util'

/**
 * @note requires preceding dataSourceProvicer middleware
 * @description a middleware that restricts access to every user not signed in
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>} null
 */
const checkAuth: RequestHandler = async (
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

/**
 * @note requires preceding checkAuth middleware
 * @description a middleware that retricts access to every user signed in except admin
 * @param req
 * @param res
 * @param next
 * @returns
 */
const checkAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    dataSource: { adminIdRepo },
    user: { id },
  } = req as MyRequest
  const isAdmin = await checkIsAdmin(id, adminIdRepo)
  if (isError(isAdmin)) {
    res.status(401).send(isAdmin)
    return
  }

  if (!isAdmin) {
    res.status(401).send({ message: 'user not admin' })
    return
  }
  next()
}

const checkIsAdmin = async (
  userId: number,
  adminIdRepo: Repository<AdminId>
): Promise<boolean | ErrorMessage> => {
  try {
    const foundAdminCount = await adminIdRepo.count({
      where: {
        userId,
      },
    })
    return foundAdminCount === 1
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export { checkAuth, checkAdmin }
