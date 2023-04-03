import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import 'jsdom-worker';
import AccountForm from './AccountForm';

describe('Account Form component', () => {
  it('renders form inputs and submit button correctly', () => {
    const { getByLabelText, getByRole } = render(<AccountForm />);
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
    const submitButton = getByRole('button', { name: /Create account/i });

    expect(nameInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    expect(policyCheckbox).toBeInTheDocument();
    expect(notificationsCheckbox).toBeInTheDocument();
    expect(emailRadio).toBeInTheDocument();
    expect(phoneRadio).toBeInTheDocument();
    expect(profilePictureInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('validates input fields and shows error messages', async () => {
    const { queryByText, getByRole, findAllByRole } = render(<AccountForm />);
    const submitButton = getByRole('button', { name: /Create account/i });

    fireEvent.submit(submitButton);

    expect(await findAllByRole('alert')).toHaveLength(6);

    const savedEl = queryByText(/Data has been saved/i);
    expect(savedEl).not.toBeInTheDocument();
  });
});
