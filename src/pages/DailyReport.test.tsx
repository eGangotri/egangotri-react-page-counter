import { render, screen } from '@testing-library/react';
import React from 'react';

import DailyReport from './DailyReport';

test('renders learn react link', () => {
  render(<DailyReport />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
