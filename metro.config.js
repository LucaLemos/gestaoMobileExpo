// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Absolute path to empty-module.js
const emptyModulePath = path.resolve(__dirname, 'empty-module.js');

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    'react-native-maps': emptyModulePath,
  },
  // Alternative approach using resolveRequest
  resolveRequest: (context, moduleName, platform) => {
    if (platform === 'web' && moduleName === 'react-native-maps') {
      return {
        filePath: emptyModulePath,
        type: 'sourceFile',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = config;