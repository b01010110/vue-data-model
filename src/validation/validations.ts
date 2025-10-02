export function isStringFn(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumberFn(value: unknown): value is number {
  return typeof value === 'number'
}

export async function isRequiredStringFn(value: string): Promise<boolean> {
  return Boolean(value.trim())
}

export async function isRequiredNumberFn(value: number): Promise<boolean> {
  return value === 0 || Boolean(value)
}
