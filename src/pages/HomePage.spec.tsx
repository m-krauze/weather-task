import React from 'react';
import { render } from '@testing-library/react';
import { HomePage } from './HomePage';
import { MockedProvider } from '../testUtils/MockedProvider';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('HomePage component', () => {
  it('renders without errors', () => {
    const { container } = render(
      <MockedProvider>
        <HomePage />
      </MockedProvider>,
    );

    expect(container).toBeDefined();
    expect(container).not.toBeNull();
  });
});
