import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Card from './Card';
import data from '../../data/tests-data.json';

const testItem = data.items[0];

const mockHandleCardClick = vi.fn();

describe('Card component', () => {
  it('renders the card with the correct content', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Card key={testItem.id} item={testItem} onCardClick={mockHandleCardClick} />
      </Provider>
    );
    const byElement = getByText(/By:/i);
    const usernameElement = getByText(/modcatshop/i);
    const descriptionElement = getByText(/cat sleeping on bed/i);
    const likesElement = getByText(/Likes:/i);
    const likesNumberElement = getByText(/1354/i);
    expect(byElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
    expect(likesNumberElement).toBeInTheDocument();
  });

  it('calls the handleCardClick function when the card is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Card key={testItem.id} item={testItem} onCardClick={mockHandleCardClick} />
      </Provider>
    );
    const card = getByTestId('card');
    fireEvent.click(card);
    expect(mockHandleCardClick).toHaveBeenCalled();
  });
});
