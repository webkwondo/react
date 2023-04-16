import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AboutPage from './AboutPage';

describe('About Page', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    searchTerm: {
      searchTerm: '',
    },
  });

  it('renders correct headline', () => {
    const handlePageChange = vi.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <AboutPage onPageChange={handlePageChange} />
      </Provider>
    );

    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/About/i);
  });
});
