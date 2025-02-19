import createClientNode from './node'

const config = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  use: [],
} as any

describe('createClientNode', () => {
  const client = createClientNode(config)
  it('returns a node client', () => {
    expect(typeof client.initPromise.then).toEqual('function')
    expect(typeof client.i18n.addResource).toEqual('function')
    expect(typeof (client.i18n as any).translator).toEqual('object')
    expect(
      (client.i18n.options as any).defaultLocale
    ).toEqual(config.defaultLocale)
    expect((client.i18n.options as any).locales).toEqual(config.locales)
    expect((client.i18n.options as any).isClone).not.toEqual(true)
  })

  describe('createClientNode a second time with the same config should return a clone of i18next', () => {
    it('returns a node client', () => {
      const secondClient = createClientNode(config)
      expect(typeof secondClient.initPromise.then).toEqual('function')
      expect(typeof secondClient.i18n.addResource).toEqual('function')
      expect(typeof (secondClient.i18n as any).translator).toEqual('object')
      expect(
        (secondClient.i18n.options as any).defaultLocale
      ).toEqual(config.defaultLocale)
      expect((secondClient.i18n.options as any).locales).toEqual(config.locales)
      expect((secondClient.i18n.options as any).isClone).toEqual(true)
      expect(secondClient).not.toEqual(client)
      expect((secondClient as any).store).toEqual((client as any).store)
    })
  })

  const key = 'key'
  const clientWithKey = createClientNode(config, key)
  describe('createClientNode a with a key should create a new instance of i18next', () => {
    it('returns a node client', () => {
      expect(typeof clientWithKey.initPromise.then).toEqual('function')
      expect(typeof clientWithKey.i18n.addResource).toEqual('function')
      expect(typeof (clientWithKey.i18n as any).translator).toEqual('object')
      expect(
        (clientWithKey.i18n.options as any).defaultLocale
      ).toEqual(config.defaultLocale)
      expect(
        (clientWithKey.i18n.options as any).locales
      ).toEqual(config.locales)
      expect((clientWithKey.i18n.options as any).isClone).not.toEqual(true)
      expect(clientWithKey).not.toEqual(client)
    })
  })

  describe('createClientNode with the same key should return a clone of the previous instance', () => {
    it('returns a node client', () => {
      const secondClientWithKey = createClientNode(config, key)
      expect(typeof secondClientWithKey.initPromise.then).toEqual('function')
      expect(typeof secondClientWithKey.i18n.addResource).toEqual('function')
      expect(typeof (secondClientWithKey.i18n as any).translator).toEqual('object')
      expect(
        (secondClientWithKey.i18n.options as any).defaultLocale
      ).toEqual(config.defaultLocale)
      expect(
        (secondClientWithKey.i18n.options as any).locales
      ).toEqual(config.locales)
      expect((secondClientWithKey.i18n.options as any).isClone).toEqual(true)
      expect(secondClientWithKey).not.toEqual(clientWithKey)
      expect(
        (secondClientWithKey as any).store
      ).toEqual((clientWithKey as any).store)
    })
  })
})
