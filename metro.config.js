/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('bin', 'mil');

module.exports = config;
  