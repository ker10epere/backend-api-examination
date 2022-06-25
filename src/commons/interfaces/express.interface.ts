import { Request } from 'express'
import { User } from '../../models/user.entity'
import { MyDataSource } from './my-datasource.interface'

/**
 * @author Ker Tenepere
 * @property {User} user  - to get this you will need to pass 2 middlewares in order
 *  1. dataSourceProvider
 *  2. auth
 *
 * @property {MyDataSource} dataSource  - this provides dataSource property to Request. Use this for type casting.
 *
 * this will only work if you initialized in middleware the dataSourceProvider middleware
 */

export interface MyRequest extends Request {
  user: User

  dataSource: MyDataSource
}
