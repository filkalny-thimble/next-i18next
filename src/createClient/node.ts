import i18n from 'i18next'
import i18nextFSBackend from 'i18next-fs-backend'

import { InternalConfig, CreateClientReturn, InitPromise, I18n } from '../types'

const globalInstanceKey = Symbol('global i18next instance')
type GlobalInstanceKey = typeof globalInstanceKey

let globalInstance: I18n
const keyedGlobalInstances: Record<string, I18n> = {}

export default (
  config: InternalConfig,
  instanceKey: string | GlobalInstanceKey = globalInstanceKey
): CreateClientReturn => {
  const thisGlobalInstance = instanceKey === globalInstanceKey ? globalInstance
    : keyedGlobalInstances[instanceKey]

  let instance: I18n
  if (!thisGlobalInstance) {
    instance = i18n.createInstance(config)
  } else {
    instance = thisGlobalInstance.cloneInstance({
      ...config,
      initImmediate: false,
    })
  }

  if (instanceKey === globalInstanceKey) {
    globalInstance = instance
  } else {
    keyedGlobalInstances[instanceKey] = instance
  }

  let initPromise: InitPromise

  if (!instance.isInitialized) {
    const hasCustomBackend = config?.use?.some((b) => b.type === 'backend')
    if (!hasCustomBackend) {
      instance.use(i18nextFSBackend)
    }

    config?.use?.forEach(x => instance.use(x))
    initPromise = instance.init(config)
  } else {
    initPromise = Promise.resolve(i18n.t)
  }

  return { i18n: instance, initPromise }
}
