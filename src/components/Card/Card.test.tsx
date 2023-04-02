import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const testProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  price: 20,
  discountPercentage: 10,
  rating: 4,
  stock: 10,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: '',
  images: [
    'images/products/1/1.jpg',
    'images/products/1/2.jpg',
    'images/products/1/3.jpg',
    'images/products/1/4.jpg',
    'images/products/1/5.jpg',
  ],
};

describe('Card component', () => {
  it('renders the card with the correct content', () => {
    render(<Card key={testProduct.id} item={testProduct} />);
    const titleElement = screen.getByText('Test Product');
    const brandElement = screen.getByText('Test Brand');
    const categoryElement = screen.getByText('Test Category');
    const ratingElement = screen.getByText('Rating:');
    const stockElement = screen.getByText('10 in stock');
    const descriptionElement = screen.getByText('Test description...');
    const oldPriceElement = screen.getByText('$20.00');
    const newPriceElement = screen.getByText('$18.00');
    expect(titleElement).toBeInTheDocument();
    expect(brandElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(stockElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(oldPriceElement).toBeInTheDocument();
    expect(newPriceElement).toBeInTheDocument();
  });
});
