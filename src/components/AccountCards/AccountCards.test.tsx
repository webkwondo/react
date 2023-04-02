import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountCards from './AccountCards';

const cards = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'Test description 1',
    price: 10,
    discountPercentage: 10,
    rating: 4,
    stock: 10,
    brand: 'Test Brand 1',
    category: 'Test Category 1',
    thumbnail: '',
    images: ['images/products/1/1.jpg', 'images/products/1/2.jpg'],
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'Test description 2',
    price: 20,
    discountPercentage: 10,
    rating: 4,
    stock: 20,
    brand: 'Test Brand 2',
    category: 'Test Category 2',
    thumbnail: '',
    images: ['images/products/2/1.jpg', 'images/products/2/2.jpg'],
  },
  {
    id: 3,
    title: 'Test Product 3',
    description: 'Test description 3',
    price: 30,
    discountPercentage: 10,
    rating: 4,
    stock: 30,
    brand: 'Test Brand 3',
    category: 'Test Category 3',
    thumbnail: '',
    images: ['images/products/3/1.jpg', 'images/products/3/2.jpg'],
  },
];

describe('Cards component', () => {
  it('should render the correct number of cards', () => {
    const { getAllByTestId } = render(<AccountCards products={cards} />);
    const renderedCards = getAllByTestId('card');

    expect(renderedCards.length).toEqual(cards.length);
  });

  it('should display correct cards titles', () => {
    render(<AccountCards products={cards} />);
    const titleElement1 = screen.getByText('Test Product 1');
    const titleElement2 = screen.getByText('Test Product 2');
    const titleElement3 = screen.getByText('Test Product 3');
    expect(titleElement1).toBeInTheDocument();
    expect(titleElement2).toBeInTheDocument();
    expect(titleElement3).toBeInTheDocument();
  });
});
