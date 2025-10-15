import { Schema } from './Schema'
import { isNumber, isRequiredNumber as required } from './validations'

export class NumberSchema extends Schema<number> {
  protected schemaValidation = isNumber
}

export function number(): NumberSchema {
  return new NumberSchema()
}

NumberSchema.useValidationFn({
  required,
})

export interface NumberSchema {
  /**
   * Check for a required number parameter
   */
  required: () => this
}
