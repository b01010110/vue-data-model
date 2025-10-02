import { Schema } from './Schema'
import { isRequiredStringFn, isStringFn } from './validations'

export class StringSchema extends Schema<string> {
  protected schemaValidation = isStringFn
}

export function string(): StringSchema {
  return new StringSchema()
}

StringSchema.useFn({
  required: { type: 'validation', fn: isRequiredStringFn },
})

export interface StringSchema {
  /**
   * Check for a required string parameter
   */
  required: () => this
}
