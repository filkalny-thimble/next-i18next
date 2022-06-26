import _typeof from "@babel/runtime/helpers/typeof";
import createClientNode from './node';
var config = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  use: []
};
describe('createClientNode', function () {
  var client = createClientNode(config);
  it('returns a node client', function () {
    expect(_typeof(client.initPromise.then)).toEqual('function');
    expect(_typeof(client.i18n.addResource)).toEqual('function');
    expect(_typeof(client.i18n.translator)).toEqual('object');
    expect(client.i18n.options.defaultLocale).toEqual(config.defaultLocale);
    expect(client.i18n.options.locales).toEqual(config.locales);
    expect(client.i18n.options.isClone).not.toEqual(true);
  });
  describe('createClientNode a second time with the same config should return a clone of i18next', function () {
    it('returns a node client', function () {
      var secondClient = createClientNode(config);
      expect(_typeof(secondClient.initPromise.then)).toEqual('function');
      expect(_typeof(secondClient.i18n.addResource)).toEqual('function');
      expect(_typeof(secondClient.i18n.translator)).toEqual('object');
      expect(secondClient.i18n.options.defaultLocale).toEqual(config.defaultLocale);
      expect(secondClient.i18n.options.locales).toEqual(config.locales);
      expect(secondClient.i18n.options.isClone).toEqual(true);
      expect(secondClient).not.toEqual(client);
      expect(secondClient.store).toEqual(client.store);
    });
  });
  var key = 'key';
  var clientWithKey = createClientNode(config, key);
  describe('createClientNode a with a key should create a new instance of i18next', function () {
    it('returns a node client', function () {
      expect(_typeof(clientWithKey.initPromise.then)).toEqual('function');
      expect(_typeof(clientWithKey.i18n.addResource)).toEqual('function');
      expect(_typeof(clientWithKey.i18n.translator)).toEqual('object');
      expect(clientWithKey.i18n.options.defaultLocale).toEqual(config.defaultLocale);
      expect(clientWithKey.i18n.options.locales).toEqual(config.locales);
      expect(clientWithKey.i18n.options.isClone).not.toEqual(true);
      expect(clientWithKey).not.toEqual(client);
    });
  });
  describe('createClientNode with the same key should return a clone of the previous instance', function () {
    it('returns a node client', function () {
      var secondClientWithKey = createClientNode(config, key);
      expect(_typeof(secondClientWithKey.initPromise.then)).toEqual('function');
      expect(_typeof(secondClientWithKey.i18n.addResource)).toEqual('function');
      expect(_typeof(secondClientWithKey.i18n.translator)).toEqual('object');
      expect(secondClientWithKey.i18n.options.defaultLocale).toEqual(config.defaultLocale);
      expect(secondClientWithKey.i18n.options.locales).toEqual(config.locales);
      expect(secondClientWithKey.i18n.options.isClone).toEqual(true);
      expect(secondClientWithKey).not.toEqual(clientWithKey);
      expect(secondClientWithKey.store).toEqual(clientWithKey.store);
    });
  });
});