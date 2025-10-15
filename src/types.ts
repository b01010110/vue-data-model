import { Ref } from 'vue'
import { Schema } from './validation'
import { ValidationError } from './validation/types'

export type ModelSettings<T extends object> = {
  [key in keyof T]: ModelSetting<T[key]>
}

export interface ModelSetting<T = unknown> {
  default: T
  schema?: Schema
}

export type ModelReturn<T extends object> = State<T> & {
  clear: () => void
  clearData: () => void
  validate: () => Promise<boolean>
}

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
