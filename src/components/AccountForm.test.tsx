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
    const emailRadio = getByLabelText(/Email/i);
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

    expect(nameInput).toBeRequired();
    expect(dobInput).toBeRequired();
    expect(countrySelect).toBeRequired();
    expect(policyCheckbox).toBeRequired();
    expect(notificationsCheckbox).not.toBeRequired();
    expect(emailRadio).toBeRequired();
    expect(phoneRadio).toBeRequired();
    expect(profilePictureInput).toBeRequired();
  });

  it('validates input fields and shows error messages', () => {
    const { getByText, queryByText, getByRole } = render(<AccountForm />);
    const submitButton = getByRole('button', { name: /Create account/i });

    fireEvent.click(submitButton);

    expect(getByText(/Please enter your first and last name/i)).toBeInTheDocument();
    expect(getByText(/Please enter your birth date/i)).toBeInTheDocument();
    expect(getByText(/Please select your country/i)).toBeInTheDocument();
    expect(getByText(/Please agree to the use of your personal data/i)).toBeInTheDocument();
    expect(getByText(/Please select your preferred contact method/i)).toBeInTheDocument();
    expect(getByText(/Please upload a JPEG or PNG image/i)).toBeInTheDocument();

    const savedEl = queryByText(/Data has been saved/i);
    expect(savedEl).not.toBeInTheDocument();
  });
});
