import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';

function applyConfig(config: ConfigType) {
  // Install Back to top Button settings
  installSettings(config);

  return config;
}

export default applyConfig;
