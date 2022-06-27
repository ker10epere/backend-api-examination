import { DataSource } from 'typeorm'
import { User } from '../../models/user.entity'

export interface UserTestData {
  generatedUser: User

  username: string

  password: string
}

export const initializeTestData =
  (dataSource: DataSource) => async (): Promise<UserTestData> => {
    const userRepo = dataSource.getRepository(User)
    const username = 'Sheldon63'
    const password = username
    await userRepo.delete({ username: username })

    const userToCreateOrUpdate = userRepo.create({
      id: 1,
      firstName: 'Sheldon',
      lastName: 'Kunze',
      address: 'Cayman Islands',
      postcode: '2536',
      contactPhoneNumber: '1-420-405-4517 x1362',
      username,
      password,
      email: 'Sheldon.Kunze20@gmail.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoZWxkb242MyIsImlhdCI6MTY1NjI5NDg4NywiZXhwIjoxNjU2MzMwODg3fQ.xpPvQDwOkujpFeXSQJpfjqzeG02ilKyRUSVE6UEgHqo',
    })

    const user = await userRepo.save(userToCreateOrUpdate)
    return {
      generatedUser: user,
      password,
      username,
    }
  }
