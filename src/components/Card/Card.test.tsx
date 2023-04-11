import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Card from './Card';
import data from '../../data/tests-data.json';

const testItem = data.items[0];

const mockHandleCardClick = vi.fn();

describe('Card component', () => {
  it('renders the card with the correct content', () => {
    render(<Card key={testItem.id} item={testItem} onCardClick={mockHandleCardClick} />);
    const byElement = screen.getByText(/By:/i);
    const usernameElement = screen.getByText(/modcatshop/i);
    const descriptionElement = screen.getByText(/cat sleeping on bed/i);
    const likesElement = screen.getByText(/Likes:/i);
    const likesNumberElement = screen.getByText(/1354/i);
    expect(byElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
    expect(likesNumberElement).toBeInTheDocument();
  });

  it('calls the handleCardClick function when the card is clicked', () => {
    const { getByTestId } = render(
      <Card key={testItem.id} item={testItem} onCardClick={mockHandleCardClick} />
    );
    const card = getByTestId('card');
    fireEvent.click(card);
    expect(mockHandleCardClick).toHaveBeenCalled();
  });
});
