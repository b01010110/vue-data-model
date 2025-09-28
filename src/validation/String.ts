import { Schema } from './Schema'
import { isRequiredStringFn } from './validations'

export class StringSchema extends Schema<string> {
  protected value: string = ''

  protected transform(value: any) {
    if (typeof value === 'string') return value
    value = value.toString()
    if (typeof value === 'string') return value
    return ''
  }
}

export function string(): StringSchema {
  return new StringSchema()
}

StringSchema.prototype.required = function () {
  this.addQueueFn({ type: 'validation', fn: isRequiredStringFn })
  return this
}

export interface StringSchema {
  /**
   * Check for a required string parameter
   */
  required: () => this
}