import request from 'supertest'
import express, { Express } from 'express'
import userRouter from './user.route'
import { AppDataSource as dataSource } from '../configs/typeorm/app-datasource.config'
import { dataSourceProvider } from '../commons/middlewares/datasource.middleware'
import { DataSource } from 'typeorm'
import {
  initializeTestData,
  UserTestData,
} from '../configs/typeorm/initialize-test-data.config'
import { toBearerToken } from '../commons/utils/test.util'

describe('Test User Route on listing all users', () => {
  let ds: DataSource
  let app: Express
  let userTestData: UserTestData

  beforeEach(async () => {
    ds = await dataSource.initialize()
    app = express()
    app.use(express.json())
    app.use(dataSourceProvider(ds))

    app.use(userRouter)

    userTestData = await initializeTestData(ds)()
  })

  afterEach((done) => {
    ds.destroy().then(() => done())
  })

  test('It should response 401 code, if user is not signed in', async () => {
    return await request(app).get('/').expect(401)
  })

  test('It should response 401 code, if user is signed in but not admin', async () => {
    const {
      generatedUser: { token },
    } = userTestData
    const bearerToken = toBearerToken(token)

    return await request(app)
      .get('/')
      .set('Authorization', bearerToken)
      .expect(401)
  })

  test('It should response 200 code, if user is admin', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .get('/')
      .set('Authorization', bearerToken)
      .expect(200)
  })
})

describe('Test User Route on listing single user', () => {
  let ds: DataSource
  let app: Express
  let userTestData: UserTestData

  beforeEach(async () => {
    ds = await dataSource.initialize()
    app = express()
    app.use(express.json())
    app.use(dataSourceProvider(ds))

    app.use(userRouter)

    userTestData = await initializeTestData(ds)()
  })

  afterEach((done) => {
    ds.destroy().then(() => done())
  })

  test('It should response 401 code, if user is not signed in', async () => {
    return await request(app).get('/2').expect(401)
  })

  test('It should response 401 code, if user is signed in but not admin', async () => {
    const {
      generatedUser: { token },
    } = userTestData
    const bearerToken = toBearerToken(token)

    return await request(app)
      .get('/2')
      .set('Authorization', bearerToken)
      .expect(401)
  })

  test('It should response 200 code, if user is admin', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .get('/2')
      .set('Authorization', bearerToken)
      .expect(200)
  })
})

describe('Test User Route on creation of user', () => {
  let ds: DataSource
  let app: Express
  let userTestData: UserTestData

  const sampleUserData = {
    firstName: 'Martin',
    lastName: 'Frami',
    address: 'Afghanistan',
    postcode: '5335',
    contactPhoneNumber: '09062781181',
    email: 'Martin99@gmail.com',
    username: 'Martin_Kihn80',
    password: '$2a$08$cKrtjFZhwonmgMFkp0VP8eGFdwLfbHliesPfzOk1X8As9ruv1qfZa',
  }

  beforeEach(async () => {
    ds = await dataSource.initialize()
    app = express()
    app.use(express.json())
    app.use(dataSourceProvider(ds))

    app.use(userRouter)

    userTestData = await initializeTestData(ds)()
  })

  afterEach((done) => {
    ds.destroy().then(() => done())
  })

  test('It should response 401 code on user creation failed, if user is not signed in', async () => {
    return await request(app)
      .post('/')
      .send(sampleUserData)
      .set('Content-Type', 'application/json')
      .expect(401)
  })

  test('It should response 401 code on user creation failed, if user is signed in, but not admin', async () => {
    const {
      generatedUser: { token },
    } = userTestData
    const bearerToken = toBearerToken(token)

    return await request(app)
      .post('/')
      .send(sampleUserData)
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(401)
  })

  test('It should response 400 code on user creation failed, if user is admin, but not provided proper data', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .post('/')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(400)
  })

  test('It should response 201 code on user creation success, if user is admin', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .post('/')
      .send(sampleUserData)
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(201)
  })
})

describe('Test User Route on updating of user', () => {
  let ds: DataSource
  let app: Express
  let userTestData: UserTestData

  const sampleUserData = {
    firstName: 'Martin',
    lastName: 'Frami',
    address: 'Afghanistan',
    postcode: '5335',
    contactPhoneNumber: '09062781181',
    email: 'Martin99@gmail.com',
    username: 'Martin_Kihn80',
    password: '$2a$08$cKrtjFZhwonmgMFkp0VP8eGFdwLfbHliesPfzOk1X8As9ruv1qfZa',
  }

  beforeEach(async () => {
    ds = await dataSource.initialize()
    app = express()
    app.use(express.json())
    app.use(dataSourceProvider(ds))

    app.use(userRouter)

    userTestData = await initializeTestData(ds)()
  })

  afterEach((done) => {
    ds.destroy().then(() => done())
  })

  test('It should response 401 code on user modification failed, if user is not signed in', async () => {
    return await request(app)
      .patch('/')
      .send({ ...sampleUserData, id: 2 })
      .set('Content-Type', 'application/json')
      .expect(401)
  })

  test('It should response 401 code on user modification failed, if user is signed in, but not admin', async () => {
    const {
      generatedUser: { token },
    } = userTestData
    const bearerToken = toBearerToken(token)

    return await request(app)
      .patch('/')
      .send({ ...sampleUserData, id: 2 })
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(401)
  })

  test('It should response 400 code on user modification failed, if user is admin, but not provided proper data', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .patch('/')
      .send({ error: 'error' })
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(400)
  })

  test('It should response 201 code on user modification success, if user is admin', async () => {
    const { token } = userTestData.generatedUserAdmin
    const bearerToken = toBearerToken(token)
    return await request(app)
      .patch('/')
      .send({ ...sampleUserData, id: 2 })
      .set('Content-Type', 'application/json')
      .set('Authorization', bearerToken)
      .expect(200)
  })
})
