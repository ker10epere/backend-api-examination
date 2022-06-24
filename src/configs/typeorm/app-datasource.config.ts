import { DataSource } from 'typeorm'
import { join } from 'path'
import { Environment } from '../../commons/interfaces/node-process.interface'

export const AppDataSource = (() => {
  const { DATABASE_URL, ENV }: Environment = process.env as Environment

  const srcDir = join(__dirname, '../..')
  const isDevEnv = checkDevEnv(ENV)
  const migrationsMatcher = `${join(srcDir, 'migrations')}/*migration.{ts,js}`
  const entitiesMatcher = `${srcDir}/models/*.entity.{ts,js}`
  // console.log({ isDevEnv, migrationsMatcher, entitiesMatcher })

  return new DataSource({
    type: 'mysql',
    url: DATABASE_URL,
    // synchronize: isDevEnv,
    logging: false,
    entities: [entitiesMatcher],
    migrations: [migrationsMatcher],
    // subscribers: [],
    // dropSchema: isDevEnv,
  })
})()

function checkDevEnv(env: string): boolean {
  return ['DEV', 'STG'].some((item) => item === env)
}
