import React from 'react';
import AccountForm from '../components/AccountForm';

interface IAccountPageProps {
  onPageChange: (pageName: string) => void;
}

class AccountPage extends React.Component<IAccountPageProps> {
  componentDidMount() {
    const { onPageChange } = this.props;
    onPageChange('Account');
  }

  render() {
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
  }
}

export default AccountPage;
