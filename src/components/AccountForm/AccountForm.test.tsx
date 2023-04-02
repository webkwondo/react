import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import 'jsdom-worker';
import AccountForm from './AccountForm';

describe('Account Form component', () => {
  it('renders form inputs correctly', () => {
    const { getByLabelText } = render(<AccountForm />);
    const nameInput = getByLabelText(/Full name */i);
    const dobInput = getByLabelText(/Birth date */i);
    const countrySelect = getByLabelText(/Country */i);
    const policyCheckbox = getByLabelText(
      /I agree to the use of my personal data for the service's purpose */i
    );
    const notificationsCheckbox = getByLabelText(
      /I want to receive notifications about promo, sales, etc./i
    );
    const emailRadio = getByLabelText(/E-mail/i);
    const phoneRadio = getByLabelText(/Phone/i);
    const profilePictureInput = getByLabelText(/Upload a profile picture */i);

    expect(nameInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    expect(policyCheckbox).toBeInTheDocument();
    expect(notificationsCheckbox).toBeInTheDocument();
    expect(emailRadio).toBeInTheDocument();
    expect(phoneRadio).toBeInTheDocument();
    expect(profilePictureInput).toBeInTheDocument();
  });

  it('validates input fields and shows error messages', () => {
    const { queryByText, getByRole } = render(<AccountForm />);
    const submitButton = getByRole('button', { name: /Create account/i });

    fireEvent.click(submitButton);

    const savedEl = queryByText(/Data has been saved/i);
    expect(savedEl).not.toBeInTheDocument();
  });
});
