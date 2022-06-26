import fs from 'fs';
import path from 'path';
const DEFAULT_CONFIG_PATH = './next-i18next.config.js';
const resolvedConfigPath = path.resolve(DEFAULT_CONFIG_PATH);
export let nextI18NextConfig = null;

if (!fs.existsSync(resolvedConfigPath)) {
  nextI18NextConfig = null;
}

nextI18NextConfig = require(resolvedConfigPath);