import React, { useEffect } from 'react';
import AccountForm from '../../components/AccountForm/AccountForm';

interface AccountPageProps {
  onPageChange: (pageName: string) => void;
}

const AccountPage: React.FC<AccountPageProps> = (props) => {
  const { onPageChange } = props;

  useEffect(() => {
    onPageChange('Account');
  }, [onPageChange]);

  return (
    <main className="page__main page__main--account">
      <div className="page__main-content">
        <div className="page__title visually-hidden">
          <div className="page__title-container container">
            <h1 className="page__title-copy">Account</h1>
          </div>
        </div>

        <section className="page__account account">
          <div className="account__container container">
            <div className="page__account-form">
              <AccountForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AccountPage;
