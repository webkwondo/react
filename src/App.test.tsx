import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import App from './App';
import { useGetItemsQuery } from './api/api';

vi.mock('./api/api');

describe('App', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    searchTerm: {
      searchTerm: '',
    },
  });

  it('fully renders and has necessary elements', async () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toBeInTheDocument();

    expect(getByRole('main')).toBeInTheDocument();
  });

  it('correctly lands on a non existent page', () => {
    const notFoundRoute = '/some/not-found/route';

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[notFoundRoute]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(getByRole('main')).toHaveTextContent(/not found/i);
  });
});
