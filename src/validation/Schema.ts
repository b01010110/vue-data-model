export interface Validation<T = any> {
  type: 'validation'
  fn: (value: T) => boolean
}

export interface Modification<T = any> {
  type: 'modification'
  fn: (value: T) => T
}

export type QueueFn = Validation | Modification

export abstract class Schema<T = any> {
  protected abstract value: T
  protected abstract transform(value: unknown): T

  protected queueFn: QueueFn[] = []

  protected addQueueFn(queueFn: QueueFn) {
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
