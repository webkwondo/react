import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AccountPage from './AccountPage';

describe('Account Page', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    account: {
      accounts: [],
    },
  });

  it('renders correct headline', () => {
    const handlePageChange = vi.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <AccountPage onPageChange={handlePageChange} />
      </Provider>
    );

    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/Account/i);
  });
});
