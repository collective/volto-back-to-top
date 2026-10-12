/**
 * BackToTop slot registration.
 * @module config/back-to-top
 */

import type { ConfigType } from '@plone/registry';
import { BackToTop } from 'volto-back-to-top/components/BackToTop';
import upSVG from '@plone/volto/icons/up.svg';

export default function install(config: ConfigType) {
  // Up Icon default settings
  config.settings.up_icon_default = upSVG;

  // Register BackToTop component in appExtras
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
