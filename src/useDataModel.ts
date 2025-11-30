import { reactive } from 'vue'
import { ModelInstanceSettings, ModelSettings, ModelReturn, ModelInstance, Model } from './types'

export function useDataModel<T extends object, M extends string>(
  instance: ModelInstanceSettings<T>,
  settings: ModelSettings<M>
): ModelReturn<T, M> {
  const singularKey = settings.modelName
  const pluralKey = settings.modelName.charAt(0).toUpperCase() + settings.modelName.slice(1) + 's'

  return {
    [singularKey]: getModelInstance(instance),
    [pluralKey]: getModel(instance),
  } as any
}

function getModelInstance<T extends object>(instance: ModelInstanceSettings<T>): ModelInstance<T> {
  const modelInstance: any = {}
  modelInstance.errors = {}

  for (const key in instance) {
    modelInstance[key] = instance[key].default
    modelInstance.errors[key] = []
  }

  modelInstance.save = async function () {
    console.log('save')
  }

  modelInstance.delete = async function () {
    console.log('delete')
  }

  modelInstance.validate = async function () {
    console.log('validate')
  }

  modelInstance.reload = async function () {
    console.log('reload')
  }

  modelInstance.clear = async function (this: ModelInstance<T>) {
    this.clearData()
    console.log('clear')
  }

  modelInstance.clearData = async function (this: ModelInstance<T>) {
    for (const key in instance) {
      modelInstanceReactive[key] = instance[key].default
    }
    console.log('clearData')
  }

  const modelInstanceReactive = reactive(modelInstance)

  return modelInstanceReactive
}

function getModel<T extends object>(instance: ModelInstanceSettings<T>): Model<T> {
  const model: any = {}

  model.all = async function () {
    console.log('all')
  }

  model.get = async function () {
    console.log('get')
  }

  model.create = async function () {
    console.log('create')
  }

  model.update = async function () {
    console.log('update')
  }

  model.delete = async function () {
    console.log('delete')
  }

  return model
}

// const state: State<T> = {} as State<T>

// for (const key in settings) {
//   state[key as keyof T] = {
//     model: ref(settings[key].default),
//     default: settings[key].default,
//     isError: ref(false),
//     errors: ref([]),
//     schema: settings[key].schema,
//     validate: async function () {
//       this.errors.value = []

//       const validateResult = await this.schema?.validate(this.model.value)
//       if (validateResult === undefined) return

//       const { isError, error } = validateResult
//       this.isError.value = isError
//       if (error) this.errors.value.push(error)
//     },
//   } as State<T>[keyof T]
// }

// function clearData() {
//   for (const key in state) {
//     if (state[key as keyof T].default === undefined) continue
//     state[key as keyof T].model.value = state[key as keyof T].default
//   }
// }

// function clear() {
//   clearData()
// }

// async function validate(): Promise<boolean> {
//   for (const key in state) {
//     await state[key].validate()
//   }

//   return Object.values<State<T>[keyof T]>(state)
//     .map((item) => item.isError.value)
//     .every((item) => item === false)
// }
