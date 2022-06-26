import i18n from 'i18next';
export default (config => {
  const instance = i18n.createInstance(config);
  let initPromise;

  if (!instance.isInitialized) {
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