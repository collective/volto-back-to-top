/**
 * BackToTop component — accessible floating "back to top" button.
 * @module components/BackToTop/BackToTop
 */

import { useState, useEffect, useRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';

const messages = defineMessages({
  backToTop: {
    id: 'Back to top',
    defaultMessage: 'Back to top',
  },
});

const SCROLL_THRESHOLD = 250;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const buttonRef = useRef(null);
  const intl = useIntl();
  const settings = config.settings || {};

  useEffect(() => {
    const getProgress = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      return scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > SCROLL_THRESHOLD);
        buttonRef.current?.style.setProperty('--progress', getProgress());
        rafRef.current = null;
      });
    };

    const ro = new ResizeObserver(() => {
      buttonRef.current?.style.setProperty('--progress', getProgress());
    });
    ro.observe(document.body);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    });
    const target =
      document.getElementById('page-document') ||
      document.getElementById('main') ||
      document.body;
    if (target && !target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target?.focus({ preventScroll: true });
  };

  return (
    <button
      ref={buttonRef}
      className={`back-to-top${visible ? ' visible' : ''}`}
      aria-label={intl.formatMessage(messages.backToTop)}
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
      title={intl.formatMessage(messages.backToTop)}
    >
      <svg
        className="back-to-top-ring"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="ring-track" cx="24" cy="24" r="21" />
        <circle
          className="ring-progress"
          cx="24"
          cy="24"
          r="21"
          pathLength="100"
        />
      </svg>
      {settings.up_icon_default && (
        <Icon name={settings.up_icon_default} size="24px" />
      )}
    </button>
  );
};

export default BackToTop;
