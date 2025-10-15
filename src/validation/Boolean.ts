import { Schema } from './Schema'
import { isBoolean, isRequiredBoolean as required } from './validations'

export class BooleanSchema extends Schema<boolean> {
  protected schemaValidation = isBoolean
}

export function boolean(): BooleanSchema {
  return new BooleanSchema()
}

BooleanSchema.useValidationFn({
  required,
})

export interface BooleanSchema {
  /**
   * Check for a required boolean parameter
   */
  required: () => this
}
