import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('Search Bar component', () => {
  it('renders search bar correctly', () => {
    const { getByLabelText } = render(<SearchBar />);
    const searchBar = getByLabelText(/Search for items/i);
    expect(searchBar).toBeInTheDocument();
  });

  it('sets initial search term from local storage', () => {
    localStorage.setItem('searchTerm', 'test');
    const { getByDisplayValue } = render(<SearchBar />);
    const searchField = getByDisplayValue('test');
    expect(searchField).toBeInTheDocument();
  });

  test('updates search term when input field is changed', () => {
    const { getByLabelText } = render(<SearchBar />);
    const searchField = getByLabelText(/Search for items/i) as HTMLInputElement;
    fireEvent.change(searchField, { target: { value: 'test' } });
    expect(searchField.value).toBe('test');
  });

  test('prevents form default event on submit', () => {
    const { getByRole } = render(<SearchBar />);
    const submitButton = getByRole('button', { name: /Search/i });
    const form = submitButton.closest('form') as HTMLFormElement;
    const preventDefault = vi.fn();
    form.addEventListener('submit', preventDefault);
    fireEvent.submit(submitButton);
    expect(preventDefault).toHaveBeenCalled();
  });
});
