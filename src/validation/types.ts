export interface ValidationObject<T = unknown> {
  errorMessage: string
  fn: (value: T) => Promise<boolean>
}

export interface ValidationsObject<T = unknown> {
  [key: string]: ValidationObject<T>
}

export interface ValidationError {
  path: string
  message: string
}

export interface ValidationState {
  isError: boolean
  error?: ValidationError
}
