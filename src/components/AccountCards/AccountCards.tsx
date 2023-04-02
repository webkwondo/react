import React from 'react';
import AccountCard from '../AccountCard/AccountCard';

interface IAccountCardsProps {
  accounts: IAccountData[];
}

class Cards extends React.Component<IAccountCardsProps> {
  render() {
    const { accounts } = this.props;

    return (
      <div className="account__cards cards view-mode-grid">
        {accounts.map((account) => {
          return <AccountCard key={account.id} item={account} />;
        })}
      </div>
    );
  }
}

export default Cards;
