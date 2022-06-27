import { faker } from '@faker-js/faker'
import { DataSource, Repository } from 'typeorm'
import { generateUserToken } from '../../commons/utils/jwt.util'
import { EditUserDTO } from '../../dtos/user.dto'
import { AdminId } from '../../models/admin-id.entity'
import { User } from '../../models/user.entity'

export interface UserTestData {
  generatedUserAdmin: User

  generatedUser: User

  username: string

  password: string
}

export const initializeTestData =
  (dataSource: DataSource) => async (): Promise<UserTestData> => {
    const userRepo = dataSource.getRepository(User)
    const adminRepo = dataSource.getRepository(AdminId)

    const adminId = 1
    await adminRepo.delete({ userId: adminId })

    const adminUsername = 'Sheldon63'
    const adminPassword = adminUsername
    await userRepo.delete({ username: adminUsername })

    const admin = await generateUser(userRepo, {
      id: adminId,
      username: adminUsername,
      password: adminPassword,
    })

    await adminRepo.save({ userId: adminId })

    await userRepo.delete(2)
    const user = await generateUser(userRepo, { id: 2 })
    return {
      generatedUserAdmin: admin,
      generatedUser: user,
      password: adminPassword,
      username: adminUsername,
    }
  }

async function generateUser(
  userRepo: Repository<User>,
  userBody?: EditUserDTO
) {
  const user = new User()

  user.id
  user.firstName = faker.name.firstName('male')
  user.lastName = faker.name.lastName('male')
  user.address = faker.address.country()
  user.postcode = faker.address.zipCode('####')
  user.contactPhoneNumber = faker.phone.number('+63 9## ### ####')
  user.email = faker.internet.email(user.firstName, user.lastName)
  user.username = faker.internet.userName(user.firstName)
  user.password = user.username
  user.token = generateUserToken(userBody?.username || user.username)

  if (userBody !== undefined) {
    const userToCreateOrUpdate = userRepo.create({ ...user, ...userBody })

    return await userRepo.save(userToCreateOrUpdate)
  }

  return await userRepo.save(user)
}
