import { DataSource, DataSourceOptions } from 'typeorm'
import { program } from 'commander'
import { runSeeders, SeederOptions, setDataSource } from 'typeorm-extension'
import UserSeeder from './seeds/user.seeder'
import userFactory from './factories/user.factory'
import { dataSourceOptions } from '../configs/typeorm/app-datasource.config'

const options: DataSourceOptions & SeederOptions = Object.assign(
  dataSourceOptions,
  {
    dropSchema: false,
  }
)

program
  .name('typeorm seeder')
  .description('generates dummy data to defined factory')
  .version('0.0.1')

program
  .command('user')
  .description('generates dummy data using (user factory)')
  .argument('<number>', 'size of data to generate')
  .action((size: string) => {
    null
    ;(async () => {
      const dataSource = new DataSource(options)
      await dataSource.initialize()
      setDataSource(dataSource)
      await runSeeders(dataSource, {
        seeds: [UserSeeder(parseInt(size))],
        factories: [userFactory],
      })
      await dataSource.destroy()
      console.log('DONE!')
    })()
  })

program.parse()
