import React from 'react';

interface IAccountFormSelectProps {
  identifier: string;
  text: string;
  ref: React.RefObject<HTMLSelectElement>;
  options: { value: string; id: number }[];
}

class AccountFormSelect extends React.Component<IAccountFormSelectProps> {
  render() {
    const { identifier, text, ref, options } = this.props;

    return (
      <>
        <label htmlFor={identifier}>{text}</label>
        <select name={identifier} id={identifier} ref={ref} required>
          {options.map((option) => {
            return (
              <>
                <option defaultValue="">-- Please choose an option --</option>
                <option key={option.id} defaultValue={option.value.toLowerCase()}>
                  {option.value}
                </option>
              </>
            );
          })}
        </select>
      </>
    );
  }
}

export default AccountFormSelect;
