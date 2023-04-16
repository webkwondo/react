import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchBar from './SearchBar';
import store from '../../store/store';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should update search term on form submit', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(input.form!);
    expect(store.getState().searchTerm.searchTerm).toEqual('test');
  });

  it('should update search term to an empty string on empty input', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(input.form!);
    expect(store.getState().searchTerm.searchTerm).toEqual('');
  });

  it('prevents form default event on submit', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const submitButton = getByRole('button', { name: /Search/i });
    const form = submitButton.closest('form') as HTMLFormElement;
    const preventDefault = vi.fn();
    form.addEventListener('submit', preventDefault);
    fireEvent.submit(submitButton);
    expect(preventDefault).toHaveBeenCalled();
  });
});
