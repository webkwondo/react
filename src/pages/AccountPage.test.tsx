import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import AccountPage from './AccountPage';

describe('Account Page', () => {
  it('renders correct headline', () => {
    const handlePageChange = vi.fn();

    render(<AccountPage onPageChange={handlePageChange} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/Account/i);
  });
});
