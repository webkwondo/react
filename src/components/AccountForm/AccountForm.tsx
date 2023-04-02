import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AccountCards from '../AccountCards/AccountCards';
import { AccountFormFieldNames, ValidationErrors } from '../../constants';
import {
  validateContact,
  validateCountry,
  validateDob,
  validateImage,
  validateName,
  validatePolicy,
  validateNotifications,
} from './AccountFormValidator';

interface IAccountFormState {
  validationErrors: ValidationErrors;
  isSubmitted: boolean;
  accounts: IAccountData[];
}

const AccountFormSettings = {
  [AccountFormFieldNames.NAME]: {
    id: AccountFormFieldNames.NAME,
    name: AccountFormFieldNames.NAME,
    type: 'text',
    label: 'Full name *',
    value: '',
    minLength: 2,
    maxLength: 100,
    placeholder: 'First Last...',
    isRequired: true,
  },
  [AccountFormFieldNames.DOB]: {
    id: AccountFormFieldNames.DOB,
    name: AccountFormFieldNames.DOB,
    type: 'date',
    label: 'Birth date *',
    min: '1900-01-01',
    max: '2005-03-27',
    isRequired: true,
  },
  [AccountFormFieldNames.COUNTRY]: {
    id: AccountFormFieldNames.COUNTRY,
    name: AccountFormFieldNames.COUNTRY,
    label: 'Country *',
    isRequired: true,
    options: [
      {
        id: 1,
        value: 'Andorra',
      },
      {
        id: 2,
        value: 'Argentina',
      },
      {
        id: 3,
        value: 'Armenia',
      },
      {
        id: 4,
        value: 'Australia',
      },
      {
        id: 5,
        value: 'Belarus',
      },
      {
        id: 6,
        value: 'Canada',
      },
      {
        id: 7,
        value: 'India',
      },
      {
        id: 8,
        value: 'Kazakhstan',
      },
      {
        id: 9,
        value: 'Poland',
      },
      {
        id: 10,
        value: 'Russia',
      },
      {
        id: 11,
        value: 'Serbia',
      },
      {
        id: 12,
        value: 'Spain',
      },
      {
        id: 13,
        value: 'Turkey',
      },
      {
        id: 14,
        value: 'Ukraine',
      },
      {
        id: 15,
        value: 'USA',
      },
      {
        id: 16,
        value: 'Uzbekistan',
      },
      {
        id: 17,
        value: 'Vietnam',
      },
    ],
  },
  [AccountFormFieldNames.POLICY]: {
    id: AccountFormFieldNames.POLICY,
    name: AccountFormFieldNames.POLICY,
    type: 'checkbox',
    label: 'I agree to the use of my personal data for the service&apos;s purpose *',
    isRequired: true,
  },
  [AccountFormFieldNames.NOTIFICATIONS]: {
    id: AccountFormFieldNames.NOTIFICATIONS,
    name: AccountFormFieldNames.NOTIFICATIONS,
    type: 'checkbox',
    label: 'I want to receive notifications about promo, sales, etc.',
    checked: true,
  },
  [AccountFormFieldNames.CONTACT]: [
    {
      id: 'field-radio-contact-email',
      name: AccountFormFieldNames.CONTACT,
      type: 'radio',
      label: 'Email',
      value: 'email',
      isRequired: true,
    },
    {
      id: 'field-radio-contact-phone',
      name: AccountFormFieldNames.CONTACT,
      type: 'radio',
      label: 'Phone',
      value: 'phone',
      isRequired: true,
    },
  ],
  [AccountFormFieldNames.IMAGE]: {
    id: AccountFormFieldNames.IMAGE,
    name: AccountFormFieldNames.IMAGE,
    type: 'file',
    accept: 'image/png, image/jpeg',
    label: 'Upload a profile picture *',
    isRequired: true,
  },
};

class AccountForm extends React.Component<object, IAccountFormState> {
  formRef: React.RefObject<HTMLFormElement>;

  countrySelectRef: React.RefObject<HTMLSelectElement>;

  validationErrors: ValidationErrors = {};

  constructor(props: object) {
    super(props);

    this.state = {
      validationErrors: { ...this.validationErrors },
      isSubmitted: false,
      accounts: [],
    };

    this.formRef = React.createRef();
    this.countrySelectRef = React.createRef();
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = this.formRef.current;
    if (!form) return;
    const formData = new FormData(form);

    this.validationErrors = {};

    const name = formData.get(AccountFormFieldNames.NAME);
    const nameValidated = validateName(name, this.validationErrors);

    const dob = formData.get(AccountFormFieldNames.DOB);
    const dobValidated = validateDob(dob, this.validationErrors);

    const country = formData.get(AccountFormFieldNames.COUNTRY);
    const countryValidated = validateCountry(country, this.validationErrors, this.countrySelectRef);

    const policy = formData.get(AccountFormFieldNames.POLICY);
    const policyValidated = validatePolicy(policy, this.validationErrors);

    const notifications = formData.get(AccountFormFieldNames.NOTIFICATIONS);
    const notificationsValidated = validateNotifications(notifications);

    const contactRadios = formData.getAll(AccountFormFieldNames.CONTACT);
    const contactValidated = validateContact(contactRadios, this.validationErrors);

    const file = formData.get(AccountFormFieldNames.IMAGE);
    const fileValidated = validateImage(file, this.validationErrors);

    this.setState({ validationErrors: { ...this.validationErrors }, isSubmitted: false });

    if (Object.keys(this.validationErrors).length === 0) {
      const newAccount: IAccountData = {
        id: uuidv4(),
        name: nameValidated,
        dob: dobValidated,
        country: countryValidated,
        policy: policyValidated,
        notifications: notificationsValidated,
        contact: contactValidated,
        image: fileValidated,
      };

      this.setState((prevState) => {
        return { isSubmitted: true, accounts: [...prevState.accounts, newAccount] };
      });

      form.reset();
    }
  };

  showError = (fieldName: keyof ValidationErrors) => {
    const { validationErrors } = this.state;

    if (validationErrors[fieldName]) {
      return <div className="form__error">{validationErrors[fieldName]}</div>;
    }

    return '';
  };

  render() {
    const { isSubmitted, accounts } = this.state;

    return (
      <>
        <form
          className="account__form form"
          action="/"
          method="POST"
          encType="multipart/form-data"
          noValidate
          ref={this.formRef}
          onSubmit={this.handleSubmit}
        >
          <h2 className="form__title">Add payment account</h2>

          <div className="form__group">
            <label htmlFor={AccountFormSettings[AccountFormFieldNames.NAME].id}>
              {AccountFormSettings[AccountFormFieldNames.NAME].label}
            </label>
            <input
              type={AccountFormSettings[AccountFormFieldNames.NAME].type}
              name={AccountFormSettings[AccountFormFieldNames.NAME].name}
              id={AccountFormSettings[AccountFormFieldNames.NAME].id}
              defaultValue={AccountFormSettings[AccountFormFieldNames.NAME].value}
              minLength={AccountFormSettings[AccountFormFieldNames.NAME].minLength}
              maxLength={AccountFormSettings[AccountFormFieldNames.NAME].maxLength}
              placeholder={AccountFormSettings[AccountFormFieldNames.NAME].placeholder}
              required={AccountFormSettings[AccountFormFieldNames.NAME].isRequired}
            />
            {this.showError(AccountFormFieldNames.NAME)}
          </div>

          <div className="form__group">
            <label htmlFor={AccountFormSettings[AccountFormFieldNames.DOB].id}>
              {AccountFormSettings[AccountFormFieldNames.DOB].label}
            </label>
            <input
              type={AccountFormSettings[AccountFormFieldNames.DOB].type}
              name={AccountFormSettings[AccountFormFieldNames.DOB].name}
              id={AccountFormSettings[AccountFormFieldNames.DOB].id}
              min={AccountFormSettings[AccountFormFieldNames.DOB].min}
              max={AccountFormSettings[AccountFormFieldNames.DOB].max}
              required={AccountFormSettings[AccountFormFieldNames.DOB].isRequired}
            />
            {this.showError(AccountFormFieldNames.DOB)}
          </div>

          <div className="form__group">
            <label htmlFor={AccountFormFieldNames.COUNTRY}>Country *</label>

            <select
              name={AccountFormFieldNames.COUNTRY}
              id={AccountFormFieldNames.COUNTRY}
              required
              ref={this.countrySelectRef}
            >
              <option defaultValue="">-- Please choose an option --</option>
              <option defaultValue="andorra">Andorra</option>
              <option defaultValue="argentina">Argentina</option>
              <option defaultValue="armenia">Armenia</option>
              <option defaultValue="australia">Australia</option>
              <option defaultValue="belarus">Belarus</option>
              <option defaultValue="canada">Canada</option>
              <option defaultValue="india">India</option>
              <option defaultValue="kazakhstan">Kazakhstan</option>
              <option defaultValue="poland">Poland</option>
              <option defaultValue="russia">Russia</option>
              <option defaultValue="serbia">Serbia</option>
              <option defaultValue="spain">Spain</option>
              <option defaultValue="turkey">Turkey</option>
              <option defaultValue="ukraine">Ukraine</option>
              <option defaultValue="usa">USA</option>
              <option defaultValue="uzbekistan">Uzbekistan</option>
              <option defaultValue="vietnam">Vietnam</option>
            </select>

            {this.showError(AccountFormFieldNames.COUNTRY)}
          </div>

          <div className="form__group">
            <div className="checkbox-line">
              <input
                type="checkbox"
                id={AccountFormFieldNames.POLICY}
                name={AccountFormFieldNames.POLICY}
                required
              />
              <label htmlFor={AccountFormFieldNames.POLICY}>
                I agree to the use of my personal data for the service&apos;s purpose *
              </label>
            </div>

            {this.showError(AccountFormFieldNames.POLICY)}

            <div className="checkbox-line">
              <input
                type="checkbox"
                id={AccountFormFieldNames.NOTIFICATIONS}
                name={AccountFormFieldNames.NOTIFICATIONS}
                defaultChecked
              />
              <label htmlFor={AccountFormFieldNames.NOTIFICATIONS}>
                I want to receive notifications about promo, sales, etc.
              </label>
            </div>
          </div>

          <div className="form__group">
            <p className="form__group-title">Preferred contact *</p>

            <div className="radio-line">
              <input
                type="radio"
                id="field-radio-contact-email"
                name={AccountFormFieldNames.CONTACT}
                defaultValue="email"
                required
              />
              <label htmlFor="field-radio-contact-email">Email</label>
            </div>

            <div className="radio-line">
              <input
                type="radio"
                id="field-radio-contact-phone"
                name={AccountFormFieldNames.CONTACT}
                defaultValue="phone"
                required
              />
              <label htmlFor="field-radio-contact-phone">Phone</label>
            </div>

            {this.showError(AccountFormFieldNames.CONTACT)}
          </div>

          <div className="form__group">
            <label htmlFor={AccountFormFieldNames.IMAGE}>Upload a profile picture *</label>

            <input
              type="file"
              id={AccountFormFieldNames.IMAGE}
              name={AccountFormFieldNames.IMAGE}
              accept="image/png, image/jpeg"
              required
            />

            {this.showError(AccountFormFieldNames.IMAGE)}
          </div>

          <button className="account-form__button button button--outlined" type="submit">
            Create account
          </button>

          {isSubmitted && <div className="form__submit-success">Data has been saved</div>}
        </form>

        {!!accounts.length && <AccountCards accounts={accounts} />}
      </>
    );
  }
}

export default AccountForm;
