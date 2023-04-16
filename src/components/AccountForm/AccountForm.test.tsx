import React from 'react';
import { describe, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store/store';
import AccountForm from './AccountForm';

describe('AccountForm', () => {
  it('renders correctly and has submit button', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    const title = getByText(/Add payment account/i);
    const submitButton = getByRole('button', { name: /Create account/i });

    expect(title).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('handles form input changes correctly', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    fireEvent.change(getByLabelText(/Full name */i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByLabelText(/Birth date */i), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(getByLabelText(/Country */i), {
      target: { value: 'Argentina' },
    });
    fireEvent.click(
      getByLabelText(/I agree to the use of my personal data for the service's purpose */i)
    );
    fireEvent.click(getByLabelText(/I want to receive notifications about promo, sales, etc./i));
    fireEvent.click(getByLabelText(/E-mail/i));

    expect(getByLabelText(/Full name */i)).toHaveValue('John Doe');
    expect(getByLabelText(/Birth date */i)).toHaveValue('1990-01-01');
    expect(getByLabelText(/Country */i)).toHaveValue('Argentina');
    expect(
      getByLabelText(/I agree to the use of my personal data for the service's purpose */i)
    ).toBeChecked();
    expect(
      getByLabelText(/I want to receive notifications about promo, sales, etc./i)
    ).toBeChecked();
    expect(getByLabelText(/E-mail/i)).toBeChecked();
  });

  it('validates form inputs correctly', async () => {
    const { getByRole, findByText, getByLabelText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    const submitButton = getByRole('button', { name: /Create account/i });

    fireEvent.click(submitButton);

    expect(await findByText(/Please enter your first and last name/i)).toBeInTheDocument();
    expect(await findByText(/Please enter your birth date/i)).toBeInTheDocument();
    expect(await findByText(/Please select your country/i)).toBeInTheDocument();
    expect(await findByText(/Please agree to the use of your personal data/i)).toBeInTheDocument();

    fireEvent.change(getByLabelText(/Full name */i), {
      target: { value: 'J' },
    });
    fireEvent.blur(getByLabelText(/Full name */i));
    expect(await findByText(/Must be at least 2 characters long/i)).toBeInTheDocument();

    fireEvent.change(getByLabelText(/Full name */i), {
      target: { value: 'john' },
    });
    fireEvent.blur(getByLabelText(/Full name */i));
    expect(
      await findByText(/Please enter your first and last name with a capital letter/i)
    ).toBeInTheDocument();

    fireEvent.change(getByLabelText(/Birth date */i), {
      target: { value: '1899-12-31' },
    });
    fireEvent.blur(getByLabelText(/Birth date */i));
    expect(
      await findByText(/Birth date must be between 1900-01-01 and 2005-03-27/i)
    ).toBeInTheDocument();

    fireEvent.change(getByLabelText(/Birth date */i), {
      target: { value: '2005-03-28' },
    });
    fireEvent.blur(getByLabelText(/Birth date */i));
    expect(
      await findByText(/Birth date must be between 1900-01-01 and 2005-03-27/i)
    ).toBeInTheDocument();

    fireEvent.click(submitButton);
    expect(
      await findByText(/Please enter your first and last name with a capital letter/i)
    ).toBeInTheDocument();
  });

  it('validates form fields, shows error messages and prevents submit', async () => {
    const { queryByText, getByRole, findAllByRole } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );
    const submitButton = getByRole('button', { name: /Create account/i });

    fireEvent.submit(submitButton);

    expect(await findAllByRole('alert')).toHaveLength(6);

    const savedEl = queryByText(/Data has been saved/i);
    expect(savedEl).not.toBeInTheDocument();
  });
});
