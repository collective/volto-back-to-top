/**
 * Unit tests for BackToTop.jsx component.
 * @module components/BackToTop/BackToTop.test
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import BackToTop from './BackToTop';

jest.mock('@plone/volto/components/theme/Icon/Icon', () => {
  const React = require('react');
  return ({ name, size }) =>
    React.createElement('span', { 'data-testid': 'icon', 'data-size': size });
});

jest.mock('@plone/volto/registry', () => ({
  settings: { up_icon_default: 'up' },
}));

// Browser API setup
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };

  global.requestAnimationFrame = (cb) => {
    cb();
    return 0;
  };
  global.cancelAnimationFrame = jest.fn();

  window.scrollTo = jest.fn();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({ matches: false })),
  });
});

const setScrollY = (value) => {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value,
  });
};

const renderComponent = () =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <BackToTop />
    </IntlProvider>,
  );

describe('BackToTop', () => {
  beforeEach(() => {
    setScrollY(0);
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
    });

    it('renders a button element', () => {
      renderComponent();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('button has back-to-top class', () => {
      renderComponent();
      expect(screen.getByRole('button')).toHaveClass('back-to-top');
    });

    it('button has aria-label Back to top', () => {
      renderComponent();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Back to top',
      );
    });

    it('renders SVG ring', () => {
      const { container } = renderComponent();
      expect(
        container.querySelector('svg.back-to-top-ring'),
      ).toBeInTheDocument();
    });

    it('SVG ring is aria-hidden', () => {
      const { container } = renderComponent();
      expect(container.querySelector('svg.back-to-top-ring')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('renders Icon component', () => {
      renderComponent();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Visibility — initially hidden', () => {
    it('does not have visible class when scrollY is 0', () => {
      setScrollY(0);
      renderComponent();
      expect(screen.getByRole('button')).not.toHaveClass('visible');
    });

    it('has tabIndex -1 when not visible', () => {
      setScrollY(0);
      renderComponent();
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Visibility — after scroll', () => {
    it('adds visible class when scrollY exceeds threshold', () => {
      setScrollY(0);
      renderComponent();
      act(() => {
        setScrollY(300);
        fireEvent.scroll(window);
      });
      expect(screen.getByRole('button')).toHaveClass('visible');
    });

    it('has tabIndex 0 when visible', () => {
      setScrollY(0);
      renderComponent();
      act(() => {
        setScrollY(300);
        fireEvent.scroll(window);
      });
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('removes visible class when scrollY drops below threshold', () => {
      setScrollY(0);
      renderComponent();
      act(() => {
        setScrollY(300);
        fireEvent.scroll(window);
      });
      expect(screen.getByRole('button')).toHaveClass('visible');

      act(() => {
        setScrollY(100);
        fireEvent.scroll(window);
      });
      expect(screen.getByRole('button')).not.toHaveClass('visible');
    });

    it('does not add visible class at exactly the threshold (250)', () => {
      setScrollY(0);
      renderComponent();
      act(() => {
        setScrollY(250);
        fireEvent.scroll(window);
      });
      expect(screen.getByRole('button')).not.toHaveClass('visible');
    });
  });

  describe('Click behaviour', () => {
    it('calls window.scrollTo with top 0', () => {
      renderComponent();
      fireEvent.click(screen.getByRole('button'));
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ top: 0 }),
      );
    });

    it('uses smooth behavior when reduced motion not preferred', () => {
      window.matchMedia.mockReturnValue({ matches: false });
      renderComponent();
      fireEvent.click(screen.getByRole('button'));
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'smooth' }),
      );
    });

    it('uses instant behavior when reduced motion is preferred', () => {
      window.matchMedia.mockReturnValue({ matches: true });
      renderComponent();
      fireEvent.click(screen.getByRole('button'));
      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'instant' }),
      );
    });
  });

  describe('Cleanup', () => {
    it('removes scroll listener on unmount', () => {
      const removeEventListener = jest.spyOn(window, 'removeEventListener');
      const { unmount } = renderComponent();
      unmount();
      expect(removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
      );
    });
  });
});
