export const enum AccountFormFieldNames {
  NAME = 'field-name',
  DOB = 'field-birth-date',
  COUNTRY = 'field-country-select',
  POLICY = 'field-check-policy',
  NOTIFICATIONS = 'field-check-notifications',
  CONTACT = 'contact',
  IMAGE = 'field-image',
}

export interface ValidationErrors {
  [AccountFormFieldNames.NAME]?: string;
  [AccountFormFieldNames.DOB]?: string;
  [AccountFormFieldNames.COUNTRY]?: string;
  [AccountFormFieldNames.POLICY]?: string;
  [AccountFormFieldNames.CONTACT]?: string;
  [AccountFormFieldNames.IMAGE]?: string;
}
