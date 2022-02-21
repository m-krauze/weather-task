import React from 'react';
import { render } from '@testing-library/react';

import { WeatherPage } from './WeatherPage';
import { MockedProvider } from '../testUtils/MockedProvider';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    city: 'city-url',
  }),
}));

describe('WeatherPage component', () => {
  it('renders without errors', () => {
    const { container } = render(<MockedProvider><WeatherPage /></MockedProvider>);

    expect(container).toBeDefined();
    expect(container).not.toBeNull();
  });
});
