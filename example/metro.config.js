// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { getMetroTools } = require('react-native-monorepo-tools');

const monorepoMetroTools = getMetroTools();

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.watchFolders = monorepoMetroTools.watchFolders;
defaultConfig.resolver.extraNodeModules = { ...require('node-libs-react-native'), ...monorepoMetroTools.extraNodeModules };

module.exports = defaultConfig;
