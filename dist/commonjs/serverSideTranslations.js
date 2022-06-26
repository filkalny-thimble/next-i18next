"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.object.define-property.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverSideTranslations = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.set.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.object.keys.js");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _createConfig = require("./config/createConfig");

var _createClient2 = _interopRequireDefault(require("./createClient"));

var _appWithTranslation = require("./appWithTranslation");

var _nextI18NextConfig = require("./config/nextI18NextConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getFallbackLocales = function getFallbackLocales(fallbackLng) {
  if (typeof fallbackLng === 'string') {
    return [fallbackLng];
  }

  if (Array.isArray(fallbackLng)) {
    return fallbackLng;
  }

  if ((0, _typeof2["default"])(fallbackLng) === 'object' && fallbackLng !== null) {
    return Object.values(fallbackLng).reduce(function (all, locales) {
      return [].concat((0, _toConsumableArray2["default"])(all), (0, _toConsumableArray2["default"])(locales));
    }, []);
  }

  return [];
};

var flatNamespaces = function flatNamespaces(namespacesByLocale) {
  var allNamespaces = [];

  var _iterator = _createForOfIteratorHelper(namespacesByLocale),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var localNamespaces = _step.value;
      allNamespaces.push.apply(allNamespaces, (0, _toConsumableArray2["default"])(localNamespaces));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Array.from(new Set(allNamespaces));
};

var serverSideTranslations = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(initialLocale) {
    var namespacesRequired,
        configOverride,
        userConfig,
        config,
        localeExtension,
        localePath,
        fallbackLng,
        reloadOnPrerender,
        _createClient,
        i18n,
        initPromise,
        initialI18nStore,
        getLocaleNamespaces,
        namespacesByLocale,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            namespacesRequired = _args.length > 1 && _args[1] !== undefined ? _args[1] : undefined;
            configOverride = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;

            if (!(typeof initialLocale !== 'string')) {
              _context.next = 4;
              break;
            }

            throw new Error('Initial locale argument was not passed into serverSideTranslations');

          case 4:
            userConfig = configOverride;

            if (!userConfig) {
              userConfig = _nextI18NextConfig.nextI18NextConfig;
            }

            if (!(userConfig === null)) {
              _context.next = 8;
              break;
            }

            throw new Error('next-i18next was unable to find a user config');

          case 8:
            config = (0, _createConfig.createConfig)(_objectSpread(_objectSpread({}, userConfig), {}, {
              lng: initialLocale
            }));
            localeExtension = config.localeExtension, localePath = config.localePath, fallbackLng = config.fallbackLng, reloadOnPrerender = config.reloadOnPrerender;

            if (!reloadOnPrerender) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return _appWithTranslation.globalI18n === null || _appWithTranslation.globalI18n === void 0 ? void 0 : _appWithTranslation.globalI18n.reloadResources();

          case 13:
            _createClient = (0, _createClient2["default"])(_objectSpread(_objectSpread({}, config), {}, {
              lng: initialLocale
            }), configOverride === null || configOverride === void 0 ? void 0 : configOverride.key), i18n = _createClient.i18n, initPromise = _createClient.initPromise;
            _context.next = 16;
            return initPromise;

          case 16:
            initialI18nStore = (0, _defineProperty2["default"])({}, initialLocale, {});
            getFallbackLocales(fallbackLng).forEach(function (lng) {
              initialI18nStore[lng] = {};
            });

            if (Array.isArray(namespacesRequired)) {
              _context.next = 24;
              break;
            }

            if (!(typeof localePath === 'function')) {
              _context.next = 21;
              break;
            }

            throw new Error('Must provide namespacesRequired to serverSideTranslations when using a function as localePath');

          case 21:
            getLocaleNamespaces = function getLocaleNamespaces(path) {
              return _fs["default"].readdirSync(path).map(function (file) {
                return file.replace(".".concat(localeExtension), '');
              });
            };

            namespacesByLocale = Object.keys(initialI18nStore).map(function (locale) {
              return getLocaleNamespaces(_path["default"].resolve(process.cwd(), "".concat(localePath, "/").concat(locale)));
            });
            namespacesRequired = flatNamespaces(namespacesByLocale);

          case 24:
            namespacesRequired.forEach(function (ns) {
              for (var locale in initialI18nStore) {
                initialI18nStore[locale][ns] = (i18n.services.resourceStore.data[locale] || {})[ns] || {};
              }
            });
            return _context.abrupt("return", {
              _nextI18Next: {
                initialI18nStore: initialI18nStore,
                initialLocale: initialLocale,
                userConfig: config.serializeConfig ? userConfig : null
              }
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function serverSideTranslations(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.serverSideTranslations = serverSideTranslations;