import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentSection } from './ContentSection';

describe('ContentSection component', () => {
  it('renders without erros and shows provided title and children', () => {
    render(<ContentSection title="Content title">Content text</ContentSection>);

    screen.getByText('Content title');
    screen.getByText('Content text');
  });
});
