import { Router } from 'express'
import { auth } from '../commons/middlewares/auth.middleware'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { User } from '../models/user.entity'
import { userHandler } from './user.handler'

const router = Router()

router.get('/', auth, userHandler.listUser)
router.post('/', auth, validateBody(User), userHandler.createUser)

export const userRouter = router
