import { Ref } from 'vue'
import { Schema } from './validation'
import { ValidationError } from './validation/types'

export type Nil<T> = T | undefined | null

export interface ModelSettings<M extends string = string> {
  modelName: M
}

export type ModelInstanceSettings<T extends object> = {
  [key in keyof T]: ModelInstanceSetting<T[key]>
}

export interface ModelInstanceSetting<T = unknown> {
  default?: Nil<T>
  schema?: Nil<Schema>
}

export interface Model<T extends object> {
  all(): Promise<void>
  get(): Promise<void>
  create(): Promise<void>
  update(): Promise<void>
  delete(): Promise<void>
}

export type ModelInstance<T extends object> = {
  [key in keyof T]: Nil<T[key]>
} & {
  save(): Promise<void>
  delete(): Promise<void>
  validate(): Promise<void>
  reload(): Promise<void>
  clear(): Promise<void>
  clearData(): Promise<void>
  errors: {
    [key in keyof T]: ValidationError[]
  }
}

export type ModelReturn<T extends object, M extends string> = {
  [key in M as Capitalize<`${key}s`>]: Model<T>
} & {
  [key in M as `${key}`]: ModelInstance<T>
}

//

// export type ModelSettings<T extends object> = {
//   [key in keyof T]: ModelSetting<T[key]>
// }

// export interface ModelSetting<T = unknown> {
//   default: T
//   schema?: Schema
// }

// export type ModelReturn<T extends object> = State<T> & {
//   clear: () => void
//   clearData: () => void
//   validate: () => Promise<boolean>
// }

export type State<T extends object> = {
  [key in keyof T]: {
    model: Ref<T[key]>
    default: T[key]
    isError: Ref<boolean>
    errors: Ref<ValidationError[]>
    schema?: Schema
    validate: () => Promise<void>
  }
}
