import React from 'react';
import { render, screen } from '@testing-library/react';

import { Page404 } from './Page404';

describe('Page404 component', () => {
  it('renders without errors and shows title and message', () => {
    const { container } = render(<Page404 />);

    expect(container).toBeDefined();
    expect(container).not.toBeNull();

    screen.getByText('404 error!');
    screen.getByText('Page not found!');
  });
});
