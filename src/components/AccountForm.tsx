import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AccountCard from './AccountCard';

interface IAccountFormState {
  validationErrors: ValidationErrors;
  isSubmitted: boolean;
  accounts: IAccountData[];
}

interface ValidationErrors {
  'field-name'?: string;
  'field-birth-date'?: string;
  'field-country-select'?: string;
  'field-check-policy'?: string;
  contact?: string;
  'field-image'?: string;
}

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = this.formRef.current;
    if (!form) return;
    const formData = new FormData(form);

    this.validationErrors = {};

    const name = formData.get('field-name');
    const nameValidated = this.validateName(name);

    const dob = formData.get('field-birth-date');
    const dobValidated = this.validateDob(dob);

    const country = formData.get('field-country-select');
    const countryValidated = this.validateCountry(country);

    const policy = formData.get('field-check-policy');
    const policyValidated = this.validatePolicy(policy);

    const notifications = formData.get('field-check-notifications');
    const notificationsValidated = typeof notifications === 'string' ? notifications : null;

    const contactRadios = formData.getAll('contact');
    const contactValidated = this.validateContact(contactRadios);

    const file = formData.get('field-image');
    const fileValidated = this.validateImage(file);

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
  }

  validateName = (name: FormDataEntryValue | null) => {
    if (!name || typeof name !== 'string') {
      this.validationErrors['field-name'] = 'Please enter your first and last name';
      return null;
    }
    if (name.trim().length < 2) {
      this.validationErrors['field-name'] =
        'First and last name must be at least 2 characters long each';
      return null;
    }
    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) {
      this.validationErrors['field-name'] =
        'Please enter your first and last name with a capital letter, each at least 2 characters long';
      return null;
    }

    return name;
  };

  validateDob = (date: FormDataEntryValue | null) => {
    if (!date || typeof date !== 'string') {
      this.validationErrors['field-birth-date'] = 'Please enter your birth date';
      return null;
    }
    const birthDateTrimmed = date.trim();
    const birthDate = new Date(birthDateTrimmed);
    const maxBirthDate = new Date('2005-03-27');

    if (birthDate < new Date('1900-01-01') || birthDate > maxBirthDate) {
      this.validationErrors['field-birth-date'] =
        'Birth date must be between 1900-01-01 and 2005-03-27';
      return null;
    }

    return date;
  };

  validateCountry = (country: FormDataEntryValue | null) => {
    const countrySelect = this.countrySelectRef.current;
    if (!countrySelect) return null;

    if (!country || typeof country !== 'string' || countrySelect.selectedIndex === 0) {
      this.validationErrors['field-country-select'] = 'Please select your country';
      return null;
    }

    return country;
  };

  validatePolicy = (checkPolicy: FormDataEntryValue | null) => {
    if (!checkPolicy || typeof checkPolicy !== 'string') {
      this.validationErrors['field-check-policy'] = 'Please agree to the use of your personal data';
      return null;
    }

    return checkPolicy;
  };

  validateContact = (contactRadios: FormDataEntryValue[]) => {
    if (!Array.isArray(contactRadios) || contactRadios.length !== 1) {
      this.validationErrors.contact = 'Please select your preferred contact method';
      return null;
    }

    return contactRadios.join('');
  };

  validateImage = (file: FormDataEntryValue | null) => {
    if (!file || !(file instanceof File) || !/\.(jpe?g|png)$/i.test(file.name)) {
      this.validationErrors['field-image'] = 'Please upload a JPEG or PNG image';
      return null;
    }

    return file;
  };

  render() {
    const { validationErrors, isSubmitted, accounts } = this.state;

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
            <label htmlFor="field-name">Full name *</label>
            <input
              type="text"
              name="field-name"
              id="field-name"
              defaultValue=""
              minLength={2}
              maxLength={100}
              placeholder="First Last..."
              required
            />
            {validationErrors['field-name'] && (
              <div className="form__error">{validationErrors['field-name']}</div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="field-birth-date">Birth date *</label>
            <input
              type="date"
              name="field-birth-date"
              id="field-birth-date"
              min="1900-01-01"
              max="2005-03-27"
              required
            />
            {validationErrors['field-birth-date'] && (
              <div className="form__error">{validationErrors['field-birth-date']}</div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="field-country-select">Country *</label>

            <select
              name="field-country-select"
              id="field-country-select"
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

            {validationErrors['field-country-select'] && (
              <div className="form__error">{validationErrors['field-country-select']}</div>
            )}
          </div>

          <div className="form__group">
            <div className="checkbox-line">
              <input type="checkbox" id="field-check-policy" name="field-check-policy" required />
              <label htmlFor="field-check-policy">
                I agree to the use of my personal data for the service&apos;s purpose *
              </label>
            </div>

            {validationErrors['field-check-policy'] && (
              <div className="form__error">{validationErrors['field-check-policy']}</div>
            )}

            <div className="checkbox-line">
              <input
                type="checkbox"
                id="field-check-notifications"
                name="field-check-notifications"
                defaultChecked
              />
              <label htmlFor="field-check-notifications">
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
                name="contact"
                value="email"
                required
              />
              <label htmlFor="field-radio-contact-email">Email</label>
            </div>

            <div className="radio-line">
              <input
                type="radio"
                id="field-radio-contact-phone"
                name="contact"
                value="phone"
                required
              />
              <label htmlFor="field-radio-contact-phone">Phone</label>
            </div>

            {validationErrors.contact && (
              <div className="form__error">{validationErrors.contact}</div>
            )}
          </div>

          <div className="form__group">
            <label htmlFor="field-image">Upload a profile picture *</label>

            <input
              type="file"
              id="field-image"
              name="field-image"
              accept="image/png, image/jpeg"
              required
            />

            {validationErrors['field-image'] && (
              <div className="form__error">{validationErrors['field-image']}</div>
            )}
          </div>

          <button className="account-form__button button button--outlined" type="submit">
            Create account
          </button>

          {isSubmitted && <div className="form__submit-success">Data has been saved</div>}
        </form>

        {!!accounts.length && (
          <div className="account__cards cards view-mode-grid">
            {accounts.map((account) => {
              return <AccountCard key={account.id} item={account} />;
            })}
          </div>
        )}
      </>
    );
  }
}

export default AccountForm;
