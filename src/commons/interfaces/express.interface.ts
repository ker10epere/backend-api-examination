import { Request, RequestHandler } from 'express'
import { LoginDTO } from '../../dtos/login.dto'
import { UserDTO } from '../../dtos/user.dto'
import { User } from '../../models/user.entity'
import { MyDataSource } from './my-datasource.interface'

export interface MyRequest extends Request {
  user: User

  body: LoginDTO

  dataSource: MyDataSource
}
