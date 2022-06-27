import { sign, verify, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'
import { Environment } from '../interfaces/node-process.interface'
import { UserPayload } from '../interfaces/jwt.interface'
import { ErrorMessage } from '../interfaces/error.interface'
import { isTypePresent } from './type-checker.util'
const { JWT_SECRET_KEY } = process.env as Environment

function parseTokenFromBearer(authHeader: string): string {
  return authHeader.substring(7)
}

function verifyAuth({
  headers: { authorization },
}: Request): UserPayload | ErrorMessage {
  if (!isTypePresent<string>(authorization) || !authorization)
    return { error: 'authorization undefined' }

  const indexOfBearer = authorization.indexOf('Bearer ')
  if (indexOfBearer !== 0) return { error: 'invalid auth header' }

  try {
    const jwtToken = parseTokenFromBearer(authorization)
    return verify(jwtToken, JWT_SECRET_KEY) as UserPayload
  } catch (error) {
    console.log(`verifyAuth :${error}`)
    return { error }
  }
}

function generateUserToken(
  username: string,
  signOption: SignOptions = { expiresIn: '10h' }
) {
  return sign({ username }, JWT_SECRET_KEY, signOption)
}

export { verifyAuth, parseTokenFromBearer, generateUserToken }
