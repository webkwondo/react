import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('fully renders and has necessary elements', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('correctly lands on a non existent page', () => {
    const notFoundRoute = '/some/not-found/route';

    render(
      <MemoryRouter initialEntries={[notFoundRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toHaveTextContent(/not found/i);
  });
});
