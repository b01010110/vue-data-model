import { ValidationObject, ValidationsObject, ValidationState } from './types'

export abstract class Schema<T = any> {
  [key: string]: unknown

  protected abstract schemaValidation: ValidationObject<T>

  protected validationFnQueue: ValidationObject<T>[] = []

  public async validate(value: unknown): Promise<ValidationState> {
    const isValid = await this.schemaValidation.fn(value as T)
    if (!isValid) return { isError: true, error: { path: '', message: this.schemaValidation.errorMessage } }

    for (const fn of this.validationFnQueue) {
      const result = await fn.fn(value as T)
      if (!result) return { isError: true, error: { path: '', message: fn.errorMessage } }
    }

    return { isError: false }
  }

  static useValidationFn<T>(validationFnObject: ValidationsObject<T>) {
    for (const key in validationFnObject) {
      this.prototype[key] = function (this: Schema) {
        this.validationFnQueue.push(validationFnObject[key])
        return this
      }
    }
  }
}
