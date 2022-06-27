import { Router } from 'express'
import { checkAdmin, checkAuth } from '../commons/middlewares/auth.middleware'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { AddUserDTO, DeleteUserDTO, EditUserDTO } from '../dtos/user.dto'
import { User } from '../models/user.entity'
import { userHandler } from './user.handler'

const router = Router()

router.get('/', checkAuth, checkAdmin, userHandler.listUsers)
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
  validateBody(AddUserDTO),
  userHandler.createUser
)
router.patch(
  '/',
  checkAuth,
  checkAdmin,
  validateBody(EditUserDTO),
  userHandler.editUser
)
router.delete(
  '/',
  checkAuth,
  checkAdmin,
  validateBody(DeleteUserDTO),
  userHandler.deleteUsers
)

export default router
