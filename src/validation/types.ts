export interface Validation<T = any> {
  type: 'validation'
  fn: (value: T) => boolean
}

export interface Modification<T = any> {
  type: 'modification'
  fn: (value: T) => T
}

export type QueueFn<T = any> = Validation<T> | Modification<T>
