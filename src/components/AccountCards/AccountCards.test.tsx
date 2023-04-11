import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import 'jsdom-worker';
import AccountCards from './AccountCards';

const cards = [
  {
    id: '1',
    name: 'Test Name 1',
    dob: '2001-01-01',
    country: 'Andorra',
    policy: true,
    notifications: false,
    contact: 'Email',
    image: new File([new Uint8Array(10)], 'profile1.jpg', { type: 'image/jpeg' }),
  },
  {
    id: '2',
    name: 'Test Name 2',
    dob: '2002-02-02',
    country: 'Argentina',
    policy: true,
    notifications: true,
    contact: 'Email',
    image: new File([new Uint8Array(10)], 'profile2.jpg', { type: 'image/jpeg' }),
  },
  {
    id: '3',
    name: 'Test Name 3',
    dob: '2003-03-03',
    country: 'Armenia',
    policy: true,
    notifications: false,
    contact: 'Phone',
    image: new File([new Uint8Array(10)], 'profile3.jpg', { type: 'image/jpeg' }),
  },
];

describe('AccountCards component', () => {
  it('should render the correct number of account cards', () => {
    const { getAllByTestId } = render(<AccountCards accounts={cards} />);
    const renderedCards = getAllByTestId('account-card');

    expect(renderedCards.length).toEqual(cards.length);
  });

  it('should display correct cards titles', () => {
    render(<AccountCards accounts={cards} />);
    const titleElement1 = screen.getByText('Test Name 1');
    const titleElement2 = screen.getByText('Test Name 2');
    const titleElement3 = screen.getByText('Test Name 3');
    expect(titleElement1).toBeInTheDocument();
    expect(titleElement2).toBeInTheDocument();
    expect(titleElement3).toBeInTheDocument();
  });
});
