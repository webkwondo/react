import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useGetItemQuery } from '../../api/api';
import Modal from './Modal';
import data from '../../data/tests-data.json';

const itemsData = data.items;

vi.mock('../../api/api');

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockStore = configureMockStore();
  const store = mockStore({
    searchTerm: {
      searchTerm: '',
    },
  });

  it('should render the component when isOpen is true', () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: { ...itemsData[0] },
      isLoading: false,
      error: undefined,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Modal isOpen onClose={() => {}} id="1" />
      </Provider>
    );
    const modalOverlay = getByTestId('modal-overlay');
    expect(modalOverlay).toBeInTheDocument();
  });

  it('should not render the component when isOpen is false', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Modal isOpen={false} onClose={() => {}} id="1" />
      </Provider>
    );
    const modalOverlay = queryByTestId('modal-overlay');
    expect(modalOverlay).not.toBeInTheDocument();
  });

  it('should call onClose function when clicking outside the modal', () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: { ...itemsData[0] },
      isLoading: false,
      error: undefined,
    });

    const onCloseMock = vi.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <Modal isOpen onClose={onCloseMock} id="1" />
      </Provider>
    );

    const modalOverlay = getByTestId('modal-overlay');
    fireEvent.mouseDown(modalOverlay);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when escape key is pressed', () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: { ...itemsData[0] },
      isLoading: false,
      error: undefined,
    });

    const onCloseMock = vi.fn();

    render(
      <Provider store={store}>
        <Modal isOpen onClose={onCloseMock} id="1" />
      </Provider>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose function when clicking on the close button', () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: { ...itemsData[0] },
      isLoading: false,
      error: undefined,
    });

    const onCloseMock = vi.fn();

    const { getByLabelText } = render(
      <Provider store={store}>
        <Modal isOpen onClose={onCloseMock} id="1" />
      </Provider>
    );

    const closeButton = getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should display loading indicator when isContentLoading is true', () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <Modal isOpen onClose={() => {}} id="1" />
      </Provider>
    );

    const loadingIndicator = queryByTestId('progress-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('displays error message when there is an error', async () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('test error'),
    });

    const { findByText } = render(
      <Provider store={store}>
        <Modal isOpen onClose={() => {}} id="1" />
      </Provider>
    );

    const errorMessage = await findByText(/There was an error. Please, try again/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display item information when data is loaded', async () => {
    (useGetItemQuery as jest.Mock).mockReturnValue({
      data: { ...itemsData[0] },
      isLoading: false,
      error: undefined,
    });

    const { findByAltText, getByText, getByLabelText } = render(
      <Provider store={store}>
        <Modal isOpen onClose={() => {}} id="1" />
      </Provider>
    );

    const image = await findByAltText(/cat sleeping on bed/i);
    const description = getByText(/cat sleeping on bed/i);
    const date = getByText(/January 29, 2019 at 22:58:09/i);
    const authorName = getByText(/ModCatShop/);
    const authorUsername = getByText(/@modcatshop/);
    const closeButton = getByLabelText(/Close/i);
    expect(image).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(authorName).toBeInTheDocument();
    expect(authorUsername).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
});
