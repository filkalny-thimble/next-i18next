"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.object.define-property.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.some.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.promise.js");

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextFsBackend = _interopRequireDefault(require("i18next-fs-backend"));

var _nextI18NextConfig = require("../config/nextI18NextConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var globalInstanceKey = Symbol('global i18next instance');
var globalInstance;
var keyedGlobalInstances = {};

var _default = function _default(config) {
  var instanceKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalInstanceKey;

  if (instanceKey !== globalInstanceKey) {
    var _nextI18NextConfig$co;

    if (!_nextI18NextConfig.nextI18NextConfig) {
      throw new Error('next-i18next was unable to find a user config');
    }

    if (!((_nextI18NextConfig$co = _nextI18NextConfig.nextI18NextConfig.configOverrideKeys) !== null && _nextI18NextConfig$co !== void 0 && _nextI18NextConfig$co.includes(instanceKey))) {
      throw new Error("next-i18next was unable to find a configOverrideKey matching ".concat(instanceKey));
    }
  }

  var thisGlobalInstance = instanceKey === globalInstanceKey ? globalInstance : keyedGlobalInstances[instanceKey];
  var instance;

  if (!thisGlobalInstance) {
    instance = _i18next["default"].createInstance(config);
  } else {
    instance = thisGlobalInstance.cloneInstance(_objectSpread(_objectSpread({}, config), {}, {
      initImmediate: false
    }));
  }

  if (instanceKey === globalInstanceKey) {
    globalInstance = instance;
  } else {
    keyedGlobalInstances[instanceKey] = instance;
  }

  var initPromise;

  if (!instance.isInitialized) {
    var _config$use, _config$use2;

    var hasCustomBackend = config === null || config === void 0 ? void 0 : (_config$use = config.use) === null || _config$use === void 0 ? void 0 : _config$use.some(function (b) {
      return b.type === 'backend';
    });

    if (!hasCustomBackend) {
      instance.use(_i18nextFsBackend["default"]);
    }

    config === null || config === void 0 ? void 0 : (_config$use2 = config.use) === null || _config$use2 === void 0 ? void 0 : _config$use2.forEach(function (x) {
      return instance.use(x);
    });
    initPromise = instance.init(config);
  } else {
    initPromise = Promise.resolve(_i18next["default"].t);
  }

  return {
    i18n: instance,
    initPromise: initPromise
  };
};

exports["default"] = _default;
module.exports = exports.default;
module.exports.default = exports.default;