import { validate } from 'class-validator'
import { Request, Response, NextFunction, RequestHandler } from 'express'

interface ClassParam<T extends object> {
  new (params?: T): T
}

export const validateBody = <T extends object>(
  ClassType: ClassParam<T>
): RequestHandler => {
  const validationOptions = {
    whitelist: true,
    validationError: { target: false, value: true },
  }

  return async ({ body }: Request, res: Response, next: NextFunction) => {
    const classObj = new ClassType()
    Object.assign(classObj, body)

    const validateResult = await validate(classObj, validationOptions)

    if (validateResult.length !== 0) {
      res.status(400).send({
        error: validateResult.map(({ property, value, constraints }) => ({
          value,
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
