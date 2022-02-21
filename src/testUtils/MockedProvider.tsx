import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../app/store';

interface MockedProviderProps {
  /**
   * A path of the app (after domain, in url).
   * So we can test the app with a specific path as an initial one.
   * For example - /city-name
   */
  path?: string
}

export function MockedProvider(props: React.PropsWithChildren<MockedProviderProps>) {
  const { children, path } = props;
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[ path || '/' ]}>
        {children}
      </MemoryRouter>
    </Provider>
  );
}
