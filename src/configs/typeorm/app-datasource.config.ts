import { DataSource, DataSourceOptions } from 'typeorm'
import { join } from 'path'
import { Environment } from '../../commons/interfaces/node-process.interface'
import { srcDir } from '../../commons/utils/constants.util'

const { DATABASE_URL, ENV }: Environment = process.env as Environment
const isDevEnv = checkDevEnv(ENV)

const migrationsMatcher = `${join(
  srcDir,
  'database',
  'migrations'
)}/*migration.{ts,js}`

const entitiesMatcher = `${srcDir}/models/*.entity.{ts,js}`
// console.log({ isDevEnv, migrationsMatcher, entitiesMatcher })

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: DATABASE_URL,
  synchronize: isDevEnv,
  logging: true,
  entities: [entitiesMatcher],
  migrations: [migrationsMatcher],
  dropSchema: false,
}

export const AppDataSource = new DataSource(dataSourceOptions)

function checkDevEnv(env: string): boolean {
  return ['DEV', 'STG'].some((item) => item === env)
}
