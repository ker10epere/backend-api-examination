export interface ErrorMessage {
  error: unknown
}

export function isError(obj: object): obj is ErrorMessage {
  return (obj as ErrorMessage).error !== undefined
}
