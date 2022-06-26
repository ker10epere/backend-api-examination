import { Router } from 'express'
import { checkAdmin, checkAuth } from '../commons/middlewares/auth.middleware'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { DeleteUserDTO } from '../dtos/user.dto'
import { User } from '../models/user.entity'
import { userHandler } from './user.handler'

const router = Router()

router.get('/', checkAuth, userHandler.listUsers)
router.get(
  '/:id',
  checkAuth,
  checkAdmin,
  validateBody(User),
  userHandler.getUser
)
router.post(
  '/',
  checkAuth,
  checkAdmin,
  validateBody(User),
  userHandler.createUser
)
router.delete(
  '/',
  checkAuth,
  checkAdmin,
  validateBody(DeleteUserDTO),
  userHandler.deleteUsers
)

export default router
