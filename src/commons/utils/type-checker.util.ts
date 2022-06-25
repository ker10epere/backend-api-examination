/**
 *
 * @description use this to check if variable is not undefined
 * @param variable
 * @returns true if variable is not undefined
 */
export const isTypePresent = <T>(variable: unknown): variable is T => {
  return variable !== 'undefined'
}
