import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import AboutPage from './AboutPage';

describe('About Page', () => {
  it('renders correct headline', () => {
    const handlePageChange = vi.fn();

    render(<AboutPage onPageChange={handlePageChange} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/about/i);
  });
});
