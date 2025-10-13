import { Schema } from './Schema'
import { isBooleanFn, isRequiredBooleanFn } from './validations'

export class BooleanSchema extends Schema<boolean> {
  protected schemaValidation = isBooleanFn
}

export function boolean(): BooleanSchema {
  return new BooleanSchema()
}

BooleanSchema.useFn({
  required: { type: 'validation', fn: isRequiredBooleanFn },
})

export interface BooleanSchema {
  /**
   * Check for a required boolean parameter
   */
  required: () => this
}