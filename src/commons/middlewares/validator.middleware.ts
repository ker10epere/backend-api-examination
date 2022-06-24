import { validate } from 'class-validator'
import { Request, Response, NextFunction, RequestHandler } from 'express'

interface ClassParam {
  new (params?: any): any
}

export const validateBody = (ClassType: ClassParam): RequestHandler => {
  const validationOptions = {
    whitelist: true,
    validationError: { target: false, value: false },
  }

  return async ({ body }: Request, res: Response, next: NextFunction) => {
    const classObj = new ClassType()
    Object.assign(classObj, body)

    const validateResult = await validate(classObj, validationOptions)

    if (validateResult.length !== 0) {
      res.status(400).send({
        error: validateResult.map(({ property, constraints }) => ({
          property,
          constraints,
        })),
      })
      return
    }

    next()
    return
  }
}