import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import 'jsdom-worker';
import { Provider } from 'react-redux';
import store from '../../store/store';
import AccountCard from './AccountCard';

const testAccountData = {
  id: '1',
  name: 'Jane Dawn',
  dob: '1991-05-03',
  country: 'USA',
  policy: true,
  notifications: false,
  contact: 'Email',
  image: null,
};

describe('Account Card component', () => {
  it('renders account card with correct data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AccountCard item={testAccountData} />
      </Provider>
    );

    expect(getByText(/Account 1/i)).toBeInTheDocument();
    expect(getByText(/Name:/i)).toHaveTextContent('Name: Jane Dawn');
    expect(getByText(/Date of birth:/i)).toHaveTextContent('Date of birth: 1991-05-03');
    expect(getByText(/Country:/i)).toHaveTextContent('Country: USA');
    expect(getByText(/Contact:/i)).toHaveTextContent('Contact: Email');
    expect(getByText(/Policy status:/i)).toHaveTextContent('Policy status: Agreed');
    expect(getByText(/Notifications:/i)).toHaveTextContent('Notifications: No');
  });

  it('renders account card without an image', () => {
    const { queryByAltText } = render(
      <Provider store={store}>
        <AccountCard item={testAccountData} />
      </Provider>
    );

    expect(queryByAltText('Profile')).toBeNull();
  });

  it('renders account card with an image', () => {
    const imageFile = new File([new Uint8Array(10)], 'profile.jpg', { type: 'image/jpeg' });
    const accountDataWithImage: AccountData = { ...testAccountData, image: imageFile };

    const { getByAltText } = render(
      <Provider store={store}>
        <AccountCard item={accountDataWithImage} />
      </Provider>
    );

    expect(getByAltText('Profile')).toBeInTheDocument();
    expect(getByAltText('Profile')).toHaveAttribute('src', expect.stringContaining('blob:'));
  });
});
