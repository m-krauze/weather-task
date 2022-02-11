import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders Weather Task app', () => {
  render(<App />);
  const linkElement = screen.getByText('Weather Task');
  expect(linkElement).toBeInTheDocument();
});
