export interface Environment extends NodeJS.ProcessEnv {
  DATABASE_URL: string

  PORT: string

  ENV: string

  JWT_SECRET_KEY: string

  HASH_SALT: string
}
