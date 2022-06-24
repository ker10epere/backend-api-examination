import { sign, verify, SignOptions } from 'jsonwebtoken'
import { Request } from 'express'
import { Environment } from '../interfaces/node-process.interface'
import { UserPayload } from '../interfaces/jwt.interface'
const { JWT_SECRET_KEY } = process.env as Environment

function parseTokenFromBearer(authHeader: string): string {
  return authHeader.substring(7)
}

function verifyAuth(req: Request): null | UserPayload {
  try {
    const authHeader = req.headers.authorization
    if (typeof authHeader !== 'string') return null

    const indexOfBearer = authHeader.indexOf('Bearer ')
    if (indexOfBearer !== 0) return null

    const jwtToken = parseTokenFromBearer(authHeader)
    return verify(jwtToken, JWT_SECRET_KEY) as UserPayload
  } catch (e) {
    console.log(`verifyAuth :${e}`)
    return null
  }
}

function generateToken(payload: any, signOption?: SignOptions) {
  return sign(payload, JWT_SECRET_KEY, signOption)
}

function generateUserToken(
  username: string,
  signOption: SignOptions = { expiresIn: '10h' }
) {
  return generateToken({ username }, signOption)
}

export { verifyAuth, parseTokenFromBearer, generateUserToken, generateToken }
