import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../models/user.entity'

export default (size: number) =>
  class UserSeeder implements Seeder {
    public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
    ) {
      // ---------------------------------------------------

      const userFactory = await factoryManager.get(User)
      // save 1 factory generated entity, to the database
      // await userFactory.save()

      // save 5 factory generated entities, to the database
      await userFactory.saveMany(size)
    }
  }
