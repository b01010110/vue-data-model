import { ValidationObject } from './types'

export const isString: ValidationObject<string> = {
  errorMessage: 'The value is not a string',
  async fn(value) {
    return typeof value === 'string'
  },
}

export const isNumber: ValidationObject<number> = {
  errorMessage: 'The value is not a number',
  async fn(value) {
    return typeof value === 'number'
  },
}

export const isBoolean: ValidationObject<boolean> = {
  errorMessage: 'The value is not a boolean',
  async fn(value) {
    return typeof value === 'boolean'
  },
}

export const isRequiredString: ValidationObject<string> = {
  errorMessage: 'The field is required',
  async fn(value) {
    return Boolean(value.trim())
  },
}

export const isRequiredNumber: ValidationObject<number> = {
  errorMessage: 'The field is required',
  async fn(value) {
    return value === 0 || Boolean(value)
  },
}

export const isRequiredBoolean: ValidationObject<boolean> = {
  errorMessage: 'The field is required',
  async fn(value) {
    return Boolean(value)
  },
}
