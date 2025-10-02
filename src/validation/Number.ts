import { Schema } from './Schema'
import { isRequiredNumberFn, isNumberFn } from './validations'

export class NumberSchema extends Schema<number> {
  protected schemaValidation = isNumberFn
}

export function number(): NumberSchema {
  return new NumberSchema()
}

NumberSchema.useFn({
  required: { type: 'validation', fn: isRequiredNumberFn },
})

export interface NumberSchema {
  /**
   * Check for a required number parameter
   */
  required: () => this
}
