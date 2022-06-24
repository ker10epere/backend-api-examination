import { Router } from 'express'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { LoginDTO } from '../dtos/login.dto'
import * as loginController from './login.controller'

const router = Router()

router.post('/', validateBody(LoginDTO), loginController.login)

export const loginRouter = router
