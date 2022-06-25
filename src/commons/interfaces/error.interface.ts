export interface ErrorMessage {
  error: unknown
}

export function isError(obj: unknown): obj is ErrorMessage {
  return (obj as ErrorMessage)?.error !== undefined
}
