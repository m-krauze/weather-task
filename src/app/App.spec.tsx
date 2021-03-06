import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { MockedProvider } from '../testUtils/MockedProvider';

jest.mock('../pages/HomePage', () => ({
  HomePage: () => <>Home</>,
}));
jest.mock('../pages/WeatherPage', () => ({
  WeatherPage: () => <>Weather Page</>,
}));
jest.mock('../pages/Page404', () => ({
  Page404: () => <>Page 404</>,
}));

describe('Weather Task App', () => {
  it('renders without errors and shows the title', () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );

    screen.getByText('Weather Task');
  });

  it('on default path, renders "search page"', () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );

    screen.getByText('Home');
  });

  it('on "city" path, renders "city page"', () => {
    render(
      <MockedProvider path="/matched-city">
        <App />
      </MockedProvider>,
    );

    screen.getByText('Weather Page');
  });

  it('on unhandled path, render 404 page', () => {
    render(
      <MockedProvider path="/matched-with-city/somethingnotmatched">
        <App />
      </MockedProvider>,
    );

    screen.getByText('Page 404');
  });
});
