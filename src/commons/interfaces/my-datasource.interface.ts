import { Repository } from 'typeorm'
import { User } from '../../models/user.entity'

export interface MyDataSource {
  userRepo: Repository<User>
}
