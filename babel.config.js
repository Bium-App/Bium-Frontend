const SUPPORTED_API_ENVIRONMENTS = new Set(['local', 'aws', 'production']);
const DEFAULT_AWS_API_BASE_URL = 'http://13.124.250.181:8080';

const inlineApiConfiguration = ({ types }) => ({
  name: 'inline-blazememo-api-configuration',
  visitor: {
    StringLiteral(path, state) {
      if (path.node.value === '__BLAZE_API_ENVIRONMENT__') {
        path.replaceWith(types.stringLiteral(state.opts.apiEnvironment));
      } else if (path.node.value === '__BLAZE_API_BASE_URL__') {
        path.replaceWith(types.stringLiteral(state.opts.apiBaseUrl));
      }
    },
  },
});

const validateApiBaseUrl = apiBaseUrl => {
  if (!apiBaseUrl) return;

  let parsedUrl;
  try {
    parsedUrl = new URL(apiBaseUrl);
  } catch {
    throw new Error(
      `BLAZE_API_BASE_URL이 올바른 URL이 아닙니다: ${apiBaseUrl}`,
    );
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('BLAZE_API_BASE_URL은 http 또는 https URL이어야 합니다.');
  }
};

module.exports = api => {
  const defaultEnvironment =
    process.env.NODE_ENV === 'production' ? 'production' : 'local';
  const apiEnvironment = process.env.BLAZE_API_ENV || defaultEnvironment;
  const configuredApiBaseUrl = (process.env.BLAZE_API_BASE_URL || '').trim();
  const apiBaseUrl =
    configuredApiBaseUrl ||
    (apiEnvironment === 'aws' ? DEFAULT_AWS_API_BASE_URL : '');

  if (!SUPPORTED_API_ENVIRONMENTS.has(apiEnvironment)) {
    throw new Error(
      `지원하지 않는 BLAZE_API_ENV입니다: ${apiEnvironment}. ` +
        'local, aws, production 중 하나를 사용해주세요.',
    );
  }

  if (apiEnvironment !== 'local' && !apiBaseUrl) {
    throw new Error(
      `${apiEnvironment} 환경에는 BLAZE_API_BASE_URL 설정이 필요합니다.`,
    );
  }

  validateApiBaseUrl(apiBaseUrl);
  api.cache.using(() => `${apiEnvironment}:${apiBaseUrl}`);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [[inlineApiConfiguration, { apiEnvironment, apiBaseUrl }]],
  };
};
