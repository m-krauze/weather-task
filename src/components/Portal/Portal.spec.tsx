import React from 'react';
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal component', () => {
  it('When portal container is not available, throws an error', () => {
    const portal = document.getElementById('portal');
    if (!portal) {
      throw new Error('Portal container is not in DOM. It should be configured in setupTests.ts');
    }

    portal.remove();
    expect(() => render(<Portal>Test</Portal>)).toThrow('Portal is not defined.');

    /**
     * Add the portal back for other tests
     */
    const appPortal = document.createElement('div');
    appPortal.id = 'portal';
    document.body.append(appPortal);
  });

  it('Outputs child component without errors', () => {
    render(<Portal>Child content</Portal>);

    screen.getByText('Child content');
  });
});
