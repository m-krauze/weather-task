import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentWrap } from './ContentWrap';

describe('ContentWrap component', () => {
  it('renders without errors, with provided children', () => {
    const { container } = render(<ContentWrap>Test</ContentWrap>);

    expect(container).toBeDefined();
    expect(container).not.toBeNull();
    screen.getByText('Test');
  });
});
