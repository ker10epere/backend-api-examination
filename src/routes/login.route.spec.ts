import request from 'supertest'
import express, { Express } from 'express'
import loginRouter from './login.route'
import { AppDataSource as dataSource } from '../configs/typeorm/app-datasource.config'
import { dataSourceProvider } from '../commons/middlewares/datasource.middleware'
import { DataSource } from 'typeorm'
import {
  initializeTestData,
  UserTestData,
} from '../configs/typeorm/initialize-test-data.config'

describe('Test Login Route', () => {
  let ds: DataSource
  let app: Express
  let userTestData: UserTestData

  beforeEach(async () => {
    ds = await dataSource.initialize()
    app = express()
    app.use(express.json())
    app.use(dataSourceProvider(ds))
    app.use(loginRouter)

    userTestData = await initializeTestData(ds)()
  })

  afterEach((done) => {
    ds.destroy().then(() => done())
  })

  test('It should response 200 code on login success', async () => {
    const { username, password } = userTestData
    return await request(app)
      .post('/')
      .send({
        username,
        password,
      })
      .set('Content-Type', 'application/json')
      .expect(200)
  })

  test('It should response 400 code on login failed', async () => {
    const { username, password } = userTestData
    return await request(app)
      .post('/')
      .send({
        username,
        password: `${password}ERROR`,
      })
      .set('Content-Type', 'application/json')
      .expect(400)
  })
})
