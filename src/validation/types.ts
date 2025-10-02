export interface Validation<T = unknown> {
  type: 'validation'
  fn: (value: T) => Promise<boolean>
}

export interface Modification<T = unknown> {
  type: 'modification'
  fn: (value: T) => Promise<T>
}

export type QueueFn<T = unknown> = Validation<T> | Modification<T>

export interface FnObject<T = unknown> {
  [key: string]: QueueFn<T>
}
