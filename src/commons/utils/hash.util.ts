import { Environment } from '../interfaces/node-process.interface'
import { hash } from 'bcryptjs'

const { HASH_SALT } = process.env as Environment

export async function generateHash(input: string): Promise<string> {
  return await hash(input, parseInt(HASH_SALT))
}
