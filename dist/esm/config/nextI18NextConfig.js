import fs from 'fs';
import path from 'path';
var DEFAULT_CONFIG_PATH = './next-i18next.config.js';
var resolvedConfigPath = path.resolve(DEFAULT_CONFIG_PATH);
export var nextI18NextConfig = null;

if (!fs.existsSync(resolvedConfigPath)) {
  nextI18NextConfig = null;
}

nextI18NextConfig = require(resolvedConfigPath);