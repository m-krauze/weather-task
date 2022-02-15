import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal component', () => {
  it('renders without errors', () => {
    render(<Modal>Some modal content</Modal>);

    screen.getByText('Some modal content');
  });
});
