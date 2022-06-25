import { Repository } from 'typeorm'
import { AdminId } from '../../models/admin-id.entity'
import { User } from '../../models/user.entity'

export interface MyDataSource {
  userRepo: Repository<User>

  adminIdRepo: Repository<AdminId>
}
