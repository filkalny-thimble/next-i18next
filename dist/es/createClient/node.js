import i18n from 'i18next';
import i18nextFSBackend from 'i18next-fs-backend';
import { nextI18NextConfig } from '../config/nextI18NextConfig';
const globalInstanceKey = Symbol('global i18next instance');
let globalInstance;
const keyedGlobalInstances = {};
export default ((config, instanceKey = globalInstanceKey) => {
  if (instanceKey !== globalInstanceKey) {
    if (!nextI18NextConfig) {
      throw new Error('next-i18next was unable to find a user config');
    }

    if (!nextI18NextConfig.configOverrideKeys?.includes(instanceKey)) {
      throw new Error(`next-i18next was unable to find a configOverrideKey matching ${instanceKey}`);
    }
  }

  const thisGlobalInstance = instanceKey === globalInstanceKey ? globalInstance : keyedGlobalInstances[instanceKey];
  let instance;

  if (!thisGlobalInstance) {
    instance = i18n.createInstance(config);
  } else {
    instance = thisGlobalInstance.cloneInstance({ ...config,
      initImmediate: false
    });
  }

  if (instanceKey === globalInstanceKey) {
    globalInstance = instance;
  } else {
    keyedGlobalInstances[instanceKey] = instance;
  }

  let initPromise;

  if (!instance.isInitialized) {
    const hasCustomBackend = config?.use?.some(b => b.type === 'backend');

    if (!hasCustomBackend) {
      instance.use(i18nextFSBackend);
    }

    config?.use?.forEach(x => instance.use(x));
    initPromise = instance.init(config);
  } else {
    initPromise = Promise.resolve(i18n.t);
  }

  return {
    i18n: instance,
    initPromise
  };
});