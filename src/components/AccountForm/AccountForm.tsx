/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import AccountCards from '../AccountCards/AccountCards';

interface IAccountFormState {
  accounts: IAccountData[];
}

interface IAccountFormData {
  fieldFullName: string;
  fieldDob: string;
  fieldCountry: string;
  fieldCheckPolicy: boolean;
  fieldCheckNotifications: boolean;
  fieldContact: string;
  fieldImage: FileList;
}

const AccountForm = () => {
  const [accountFormState, setAccountFormState] = useState(() => {
    const state: IAccountFormState = { accounts: [] };
    return state;
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<IAccountFormData>();

  const onSubmit = (data: IAccountFormData) => {
    const newAccount: IAccountData = {
      id: uuidv4(),
      name: data.fieldFullName,
      dob: data.fieldDob,
      country: data.fieldCountry,
      policy: data.fieldCheckPolicy,
      notifications: data.fieldCheckNotifications,
      contact: data.fieldContact,
      image: data.fieldImage[0],
    };

    setAccountFormState((prevState: IAccountFormState) => {
      return { accounts: [...prevState.accounts, newAccount] };
    });

    reset();
  };

  return (
    <>
      <form className="account__form form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form__title">Add payment account</h2>

        <div className="form__group">
          <label htmlFor="fieldFullName">Full name *</label>
          <input
            type="text"
            id="fieldFullName"
            placeholder="First Last..."
            {...register('fieldFullName', {
              required: {
                value: true,
                message: 'Please enter your first and last name',
              },
              minLength: {
                value: 2,
                message: 'Must be at least 2 characters long',
              },
              maxLength: {
                value: 100,
                message: 'Maximum length is 100 characters',
              },
              pattern: {
                value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                message: 'Please enter your first and last name with a capital letter',
              },
            })}
          />

          {errors.fieldFullName && (
            <div className="form__error" role="alert">
              {errors.fieldFullName.message}
            </div>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="fieldDob">Birth date *</label>
          <input
            type="date"
            id="fieldDob"
            {...register('fieldDob', {
              required: {
                value: true,
                message: 'Please enter your birth date',
              },
              min: {
                value: '1900-01-01',
                message: 'Birth date must be between 1900-01-01 and 2005-03-27',
              },
              max: {
                value: '2005-03-27',
                message: 'Birth date must be between 1900-01-01 and 2005-03-27',
              },
            })}
          />

          {errors.fieldDob && (
            <div className="form__error" role="alert">
              {errors.fieldDob.message}
            </div>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="fieldCountry">Country *</label>
          <select
            id="fieldCountry"
            {...register('fieldCountry', {
              required: {
                value: true,
                message: 'Please select your country',
              },
            })}
          >
            <option value="">-- Please choose an option --</option>
            <option value="Andorra">Andorra</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
          </select>

          {errors.fieldCountry && (
            <div className="form__error" role="alert">
              {errors.fieldCountry.message}
            </div>
          )}
        </div>

        <div className="form__group">
          <div className="checkbox-line">
            <input
              type="checkbox"
              id="fieldCheckPolicy"
              {...register('fieldCheckPolicy', {
                required: {
                  value: true,
                  message: 'Please agree to the use of your personal data',
                },
              })}
            />
            <label htmlFor="fieldCheckPolicy">
              I agree to the use of my personal data for the service&apos;s purpose *
            </label>
          </div>

          {errors.fieldCheckPolicy && (
            <div className="form__error" role="alert">
              {errors.fieldCheckPolicy.message}
            </div>
          )}

          <div className="checkbox-line">
            <input
              type="checkbox"
              id="fieldCheckNotifications"
              {...register('fieldCheckNotifications', {})}
            />
            <label htmlFor="fieldCheckNotifications">
              I want to receive notifications about promo, sales, etc.
            </label>
          </div>
        </div>

        <div className="form__group">
          <p className="form__group-title">Preferred contact *</p>

          <div className="radio-line">
            <input
              type="radio"
              id="fieldContact1"
              value="Email"
              {...register('fieldContact', { required: true })}
            />
            <label htmlFor="fieldContact1">E-mail</label>
          </div>

          <div className="radio-line">
            <input
              type="radio"
              id="fieldContact2"
              value="Phone"
              {...register('fieldContact', { required: true })}
            />
            <label htmlFor="fieldContact2">Phone</label>
          </div>

          {errors.fieldContact && (
            <div className="form__error" role="alert">
              Please select your preferred contact method
            </div>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="fieldContact2">Upload a profile picture *</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register('fieldImage', {
              required: {
                value: true,
                message: 'Please upload a JPEG or PNG image',
              },
            })}
          />
          {errors.fieldImage && (
            <div className="form__error" role="alert">
              {errors.fieldImage.message}
            </div>
          )}
        </div>

        <button className="account-form__button button button--outlined" type="submit">
          Create account
        </button>

        {isSubmitted && isSubmitSuccessful && (
          <div className="form__submit-success">Data has been saved</div>
        )}
      </form>

      {!!accountFormState.accounts.length && <AccountCards accounts={accountFormState.accounts} />}
    </>
  );
};

export default AccountForm;
