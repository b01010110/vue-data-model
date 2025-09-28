import { ref } from 'vue'
import { ModelSettings, ModelReturn, State } from './types'

export function useDataModel<T extends object>(settings: ModelSettings<T>): ModelReturn<T> {
  const state: State<T> = {} as State<T>

  for (const key in settings) {
    state[key as keyof T] = {
      model: ref(settings[key].default),
      default: settings[key].default,
      isError: ref(false),
      errors: ref([]),
      schema: settings[key].schema,
      validate: () => Promise.resolve(true),
    } as State<T>[keyof T]
  }

  function clearData() {
    for (const key in state) {
      const defaultValue = settings[key as keyof T].default
      if (defaultValue === undefined) continue
      state[key as keyof T].model.value = defaultValue
    }
  }

  function clear() {
    clearData()
  }

  function validate() {
    for (const key in settings) {
    }
  }

  return { ...state, clearData, clear, validate }
}
