import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import HomePage from './HomePage';
import { useGetItemsQuery } from '../../api/api';
import data from '../../data/tests-data.json';

const itemsData = data.items;

vi.mock('../../api/api');

describe('Home Page', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    searchTerm: {
      searchTerm: '',
    },
  });

  it('renders correct headline', () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const handlePageChange = vi.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <HomePage onPageChange={handlePageChange} />
      </Provider>
    );

    expect(
      getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(/Home/i);
  });

  it('renders loading indicator when loading', async () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <HomePage onPageChange={() => {}} />
      </Provider>
    );

    expect(getByTestId('progress-indicator')).toBeInTheDocument();
  });

  it('removes loading indicator when finished loading', async () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: {
        results: [...itemsData],
      },
      isLoading: false,
      error: undefined,
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <HomePage onPageChange={() => {}} />
      </Provider>
    );

    expect(queryByTestId('progress-indicator')).not.toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('test error'),
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomePage onPageChange={() => {}} />
      </Provider>
    );

    expect(getByText(/There was an error. Please, try again/i)).toBeInTheDocument();
  });

  it('renders cards when not loading and no error', async () => {
    (useGetItemsQuery as jest.Mock).mockReturnValue({
      data: {
        results: [...itemsData],
      },
      isLoading: false,
      error: undefined,
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomePage onPageChange={() => {}} />
      </Provider>
    );

    expect(getByText(/cat sleeping on bed/i)).toBeInTheDocument();
  });
});
