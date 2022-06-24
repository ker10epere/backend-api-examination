import { Router, json } from 'express'
import { loginRouter } from './routes/login.route'
import { userRouter } from './routes/user.route'

const router = Router()

// middlewares
router.use(json())

// controllers
router.use('/user', userRouter)
router.use('/login', loginRouter)

export { router }
