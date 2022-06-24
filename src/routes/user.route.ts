import { Router } from 'express'
import { auth } from '../commons/middlewares/auth.middleware'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { User } from '../models/user.entity'
import * as userController from './user.controller'

const router = Router()

router.get('/', auth, userController.listUser)
router.post('/', auth, validateBody(User), userController.createUser)

export const userRouter = router
