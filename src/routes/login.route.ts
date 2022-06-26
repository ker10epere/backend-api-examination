import { Router } from 'express'
import { validateBody } from '../commons/middlewares/validator.middleware'
import { LoginDTO } from '../dtos/login.dto'
import { loginHandler } from './login.handler'

const router = Router()

router.post('/', validateBody(LoginDTO), loginHandler.login)

export default router
