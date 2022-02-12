import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { MockedProvider } from '../testUtils/MockedProvider';

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
      <MockedProvider path="/cityname">
        <App />
      </MockedProvider>,
    );

    screen.getByText('City or city not found');
  });

  it('on unhandled path, render 404 page', () => {
    render(
      <MockedProvider path="/whatever/blahblah">
        <App />
      </MockedProvider>,
    );

    screen.getByText('404');
  });
});
