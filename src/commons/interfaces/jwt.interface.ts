import { JwtPayload } from 'jsonwebtoken'

export interface UserPayload extends JwtPayload {
  username: string
}
