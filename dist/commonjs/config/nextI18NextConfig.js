"use strict";

require("core-js/modules/es.object.define-property.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextI18NextConfig = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var DEFAULT_CONFIG_PATH = './next-i18next.config.js';

var resolvedConfigPath = _path["default"].resolve(DEFAULT_CONFIG_PATH);

var nextI18NextConfig = null;
exports.nextI18NextConfig = nextI18NextConfig;

if (!_fs["default"].existsSync(resolvedConfigPath)) {
  exports.nextI18NextConfig = nextI18NextConfig = null;
}

exports.nextI18NextConfig = nextI18NextConfig = require(resolvedConfigPath);