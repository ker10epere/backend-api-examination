import { Router, json } from 'express'
import loginRouter from './routes/login.route'
import userRouter from './routes/user.route'

const routers = Router()

// middlewares
routers.use(json())

// controllers
routers.use('/user', userRouter)
routers.use('/login', loginRouter)

export { routers }
