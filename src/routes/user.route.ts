import { Router } from 'express'
import { checkAuth } from '../commons/middlewares/auth.middleware'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { User } from '../models/user.entity'
import { userHandler } from './user.handler'

const router = Router()

router.get('/', checkAuth, userHandler.listUsers)
router.post('/', checkAuth, validateBody(User), userHandler.createUser)

export default router
