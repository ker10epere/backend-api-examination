import { sign, verify, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'
import { Environment } from '../interfaces/node-process.interface'
import { UserPayload } from '../interfaces/jwt.interface'
import { ErrorMessage } from '../interfaces/error.interface'
const { JWT_SECRET_KEY } = process.env as Environment

function parseTokenFromBearer(authHeader: string): string {
  return authHeader.substring(7)
}

function verifyAuth(req: Request): UserPayload | ErrorMessage {
  const authHeader = req.headers.authorization
  if (typeof authHeader !== 'string') return { error: 'auth header is null' }

  const indexOfBearer = authHeader.indexOf('Bearer ')
  if (indexOfBearer !== 0) return { error: 'auth header is null' }

  try {
    const jwtToken = parseTokenFromBearer(authHeader)
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
  return sign(username, JWT_SECRET_KEY, signOption)
}

export { verifyAuth, parseTokenFromBearer, generateUserToken }
