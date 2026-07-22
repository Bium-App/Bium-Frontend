const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { createHash } = require('node:crypto');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const apiEnvironment = process.env.BLAZE_API_ENV || 'local';
const apiBaseUrl = process.env.BLAZE_API_BASE_URL || '';
const apiCacheKey = createHash('sha256')
  .update(`${apiEnvironment}:${apiBaseUrl}`)
  .digest('hex')
  .slice(0, 16);

const config = {
  cacheVersion: `blazememo-api-${apiCacheKey}`,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
