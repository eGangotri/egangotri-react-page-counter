import { render, screen } from '@testing-library/react';
import React from 'react';

import PageCounter from './PageCounter';

test('renders learn react link', () => {
  render(<PageCounter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
