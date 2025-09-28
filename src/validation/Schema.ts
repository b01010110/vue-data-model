import { QueueFn } from './types'

export abstract class Schema<T = any> {
  [key: string]: any

  protected abstract value: T
  protected abstract transform(value: unknown): T

  protected queueFn: QueueFn<T>[] = []

  protected addQueueFn(queueFn: QueueFn<T>) {
    this.queueFn.push(queueFn)
    return this
  }

  public validate(value: unknown): T {
    this.value = this.transform(value)

    for (const fn of this.queueFn) {
      if (fn.type === 'validation') {
        const result = fn.fn(this.value)
        if (!result) throw new Error('Validation error!')
      } else if (fn.type === 'modification') {
        this.value = fn.fn(this.value)
      }
    }

    return this.value
  }
}
