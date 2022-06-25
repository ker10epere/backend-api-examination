import { Request } from 'express'
import { LoginDTO } from '../../dtos/login.dto'
import { User } from '../../models/user.entity'
import { MyDataSource } from './my-datasource.interface'

export interface MyRequest extends Request {
  user: User

  body: LoginDTO

  dataSource: MyDataSource
}
