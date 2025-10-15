import { Schema } from './Schema'
import { isRequiredString as required, isString } from './validations'

export class StringSchema extends Schema<string> {
  protected schemaValidation = isString
}

export function string(): StringSchema {
  return new StringSchema()
}

StringSchema.useValidationFn({
  required,
})

export interface StringSchema {
  /**
   * Check for a required string parameter
   */
  required: () => this
}
