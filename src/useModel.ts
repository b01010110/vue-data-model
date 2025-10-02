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
      validate: async function () {
        const isValid = await this.schema?.validate(this.model.value)
        this.isError.value = !isValid
      },
    } as State<T>[keyof T]
  }

  function clearData() {
    for (const key in state) {
      if (state[key as keyof T].default === undefined) continue
      state[key as keyof T].model.value = state[key as keyof T].default
    }
  }

  function clear() {
    clearData()
  }

  async function validate(): Promise<boolean> {
    for (const key in state) {
      await state[key].validate()
    }

    return Object.values<State<T>[keyof T]>(state)
      .map((item) => item.isError.value)
      .every((item) => item === false)
  }

  return { ...state, clearData, clear, validate }
}
