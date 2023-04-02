/* eslint-disable no-param-reassign */
import { AccountFormFieldNames, ValidationErrors } from '../../constants';

export const validateName = (
  name: FormDataEntryValue | null,
  validationErrors: ValidationErrors
) => {
  if (!name || typeof name !== 'string') {
    validationErrors[AccountFormFieldNames.NAME] = 'Please enter your first and last name';
    return null;
  }
  if (name.trim().length < 2) {
    validationErrors[AccountFormFieldNames.NAME] =
      'First and last name must be at least 2 characters long each';
    return null;
  }
  if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) {
    validationErrors[AccountFormFieldNames.NAME] =
      'Please enter your first and last name with a capital letter, each at least 2 characters long';
    return null;
  }

  return name;
};

export const validateDob = (
  date: FormDataEntryValue | null,
  validationErrors: ValidationErrors
) => {
  if (!date || typeof date !== 'string') {
    validationErrors[AccountFormFieldNames.DOB] = 'Please enter your birth date';
    return null;
  }
  const birthDateTrimmed = date.trim();
  const birthDate = new Date(birthDateTrimmed);
  const maxBirthDate = new Date('2005-03-27');

  if (birthDate < new Date('1900-01-01') || birthDate > maxBirthDate) {
    validationErrors[AccountFormFieldNames.DOB] =
      'Birth date must be between 1900-01-01 and 2005-03-27';
    return null;
  }

  return date;
};

export const validateCountry = (
  country: FormDataEntryValue | null,
  validationErrors: ValidationErrors,
  countryRef: React.RefObject<HTMLSelectElement>
) => {
  const countrySelect = countryRef.current;
  if (!countrySelect) return null;

  if (!country || typeof country !== 'string' || countrySelect.selectedIndex === 0) {
    validationErrors[AccountFormFieldNames.COUNTRY] = 'Please select your country';
    return null;
  }

  return country;
};

export const validatePolicy = (
  checkPolicy: FormDataEntryValue | null,
  validationErrors: ValidationErrors
) => {
  if (!checkPolicy || typeof checkPolicy !== 'string') {
    validationErrors[AccountFormFieldNames.POLICY] =
      'Please agree to the use of your personal data';
    return null;
  }

  return checkPolicy;
};

export const validateNotifications = (notifications: FormDataEntryValue | null) => {
  return typeof notifications === 'string' ? notifications : null;
};

export const validateContact = (
  contactRadios: FormDataEntryValue[],
  validationErrors: ValidationErrors
) => {
  if (!Array.isArray(contactRadios) || contactRadios.length !== 1) {
    validationErrors[AccountFormFieldNames.CONTACT] = 'Please select your preferred contact method';
    return null;
  }

  return contactRadios.join('');
};

export const validateImage = (
  file: FormDataEntryValue | null,
  validationErrors: ValidationErrors
) => {
  if (!file || !(file instanceof File) || !/\.(jpe?g|png)$/i.test(file.name)) {
    validationErrors[AccountFormFieldNames.IMAGE] = 'Please upload a JPEG or PNG image';
    return null;
  }

  return file;
};
