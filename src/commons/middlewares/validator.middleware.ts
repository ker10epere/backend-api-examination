import { validate, ValidatorOptions } from 'class-validator'
import { Request, Response, NextFunction, RequestHandler } from 'express'

interface ClassParam<T extends object> {
  new (params?: T): T
}

interface ValidatorError {
  value: unknown

  property: string

  constraints: unknown
}

export const validateBody = <T extends object>(
  ClassType: ClassParam<T>
): RequestHandler => {
  const validationOptions: ValidatorOptions = {
    whitelist: true,
    validationError: { target: false, value: true },
  }

  return async ({ body }: Request, res: Response, next: NextFunction) => {
    const classObj = new ClassType()
    Object.assign(classObj, body)

    const validateResult = await validate(classObj, validationOptions)

    if (validateResult.length !== 0) {
      res.status(400).send({
        error: validateResult.map(
          ({ property, value, constraints }): ValidatorError => ({
            value,
            property,
            constraints,
          })
        ),
      })
      return
    }

    next()
    return
  }
}
