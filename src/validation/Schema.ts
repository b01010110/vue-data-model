import { FnObject, QueueFn } from './types'

export abstract class Schema<T = any> {
  [key: string]: unknown

  protected abstract schemaValidation(value: unknown): value is T

  protected queueFn: QueueFn<T>[] = []

  public async validate(value: unknown): Promise<boolean> {
    const isValid = this.schemaValidation(value)
    if (!isValid) return false

    for (const fn of this.queueFn.filter((fn) => fn.type === 'validation')) {
      const result = await fn.fn(value)
      if (!result) return false
    }

    return true
  }

  static useFn<T>(fnObject: FnObject<T>) {
    for (const key in fnObject) {
      this.prototype[key] = function (this: Schema) {
        this.queueFn.push(fnObject[key] as QueueFn)
        return this
      }
    }
  }
}
