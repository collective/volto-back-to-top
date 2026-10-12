/**
 * BackToTop slot registration.
 * @module config/back-to-top
 */

import type { ConfigType } from '@plone/registry';
import { BackToTop } from 'volto-back-to-top/components/BackToTop';

export default function installBackToTop(config: ConfigType) {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: BackToTop,
      props: {},
    },
  ];
  return config;
}
