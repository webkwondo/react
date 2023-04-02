import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import 'jsdom-worker';
import AccountCard from './AccountCard';

const testAccountData = {
  id: '1',
  name: 'Jane Dawn',
  dob: '1991-05-03',
  country: 'USA',
  policy: 'on',
  notifications: null,
  contact: 'email',
  image: null,
};

describe('Account Card component', () => {
  it('renders account card with correct data', () => {
    const { getByText } = render(<AccountCard item={testAccountData} />);

    expect(getByText(/Account 1/i)).toBeInTheDocument();
    expect(getByText(/Name:/i)).toHaveTextContent('Name: Jane Dawn');
    expect(getByText(/Date of birth:/i)).toHaveTextContent('Date of birth: 1991-05-03');
    expect(getByText(/Country:/i)).toHaveTextContent('Country: USA');
    expect(getByText(/Contact:/i)).toHaveTextContent('Contact: Email');
    expect(getByText(/Policy status:/i)).toHaveTextContent('Policy status: Agreed');
    expect(getByText(/Notifications:/i)).toHaveTextContent('Notifications: No');
  });

  it('renders account card without an image', () => {
    const { queryByAltText } = render(<AccountCard item={testAccountData} />);

    expect(queryByAltText('Profile')).toBeNull();
  });

  it('renders account card with an image', () => {
    const imageFile = new File([new Uint8Array(10)], 'profile.jpg', { type: 'image/jpeg' });
    const accountDataWithImage: IAccountData = { ...testAccountData, image: imageFile };

    const { getByAltText } = render(<AccountCard item={accountDataWithImage} />);

    expect(getByAltText('Profile')).toBeInTheDocument();
    expect(getByAltText('Profile')).toHaveAttribute('src', expect.stringContaining('blob:'));
  });
});
