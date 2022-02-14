import React from 'react';
import { render } from '@testing-library/react';

import { WeatherPage } from './WeatherPage';

describe('WeatherPage component', () => {
  it('renders without errors', () => {
    const { container } = render(<WeatherPage />);

    expect(container).toBeDefined();
    expect(container).not.toBeNull();
  });
});
