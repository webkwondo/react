import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('renders correct headline', () => {
    const handlePageChange = vi.fn();

    render(<HomePage onPageChange={handlePageChange} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/home/i);
  });
});
