/* tslint:disable no-explicit-any */
import {
  I18nContext,
  useTranslation,
  Trans,
  withTranslation,
  WithTranslation as ReactI18nextWithTranslation,
  Resources,
  DefaultNamespace,
  Translation,
} from 'react-i18next'
import { InitOptions, i18n as I18NextClient, TFunction as I18NextTFunction } from 'i18next'
import { appWithTranslation, i18n } from './'

type NextJsI18NConfig = {
  defaultLocale: string
  locales: string[]
}

export type UserConfig = {
  configOverrideKeys?: string[]
  i18n: NextJsI18NConfig
  localeExtension?: string
  localePath?:
    string | ((locale: string, namespace: string, missing: boolean) => string)
  localeStructure?: string
  reloadOnPrerender?: boolean
  serializeConfig?: boolean
  use?: any[]
} & InitOptions

export type UserConfigKeyed = UserConfig & { key?: string }

export type UserConfigOverrideSSP = Omit<UserConfigKeyed, 'configOverrideKeys'>
export type UserConfigOverrideHOC = Omit<UserConfigOverrideSSP, 'key'>

export type InternalConfig = Omit<UserConfigKeyed, 'i18n'> & NextJsI18NConfig & {
  errorStackTraceLimit: number
  fallbackLng: boolean
  // end temporal backwards compatibility WHITELIST REMOVAL
  preload: string[]
  supportedLngs: string[]
  // temporal backwards compatibility WHITELIST REMOVAL
  whitelist: string[]
}

export type UseTranslation = typeof useTranslation
export type AppWithTranslation = typeof appWithTranslation
export type TFunction = I18NextTFunction
export type I18n = I18NextClient
export type WithTranslationHocType = typeof withTranslation
export type WithTranslation = ReactI18nextWithTranslation
export type InitPromise = Promise<TFunction>
export type CreateClientReturn = {
  i18n: I18n
  initPromise: InitPromise
}

export type SSRConfig = {
  _nextI18Next: {
    initialI18nStore: any
    initialLocale: string
    userConfig: UserConfigKeyed | null
  }
}

export {
  i18n,
  I18nContext,
  appWithTranslation,
  useTranslation,
  Trans,
  Translation,
  withTranslation,
  Resources,
  DefaultNamespace,
}
