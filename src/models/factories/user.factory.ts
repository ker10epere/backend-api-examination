import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'
import { generateUserToken } from '../../commons/utils/jwt.util'
import { User } from '../user.entity'

export default setSeederFactory(User, (faker: Faker) => {
  const user = new User()

  user.id
  user.firstName = faker.name.firstName('male')
  user.lastName = faker.name.lastName('male')
  user.address = faker.address.country()
  user.postcode = faker.address.zipCode('####')
  user.contactPhoneNumber = faker.phone.number()
  user.email = faker.internet.email(user.firstName, user.lastName)
  user.username = faker.internet.userName(user.firstName)
  user.password = user.username
  user.token = generateUserToken(user.username)

  return user
})
