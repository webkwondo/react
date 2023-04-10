import React from 'react';
import AccountCard from '../AccountCard/AccountCard';

interface AccountCardsProps {
  accounts: AccountData[];
}

const Cards: React.FC<AccountCardsProps> = (props) => {
  const { accounts } = props;

  return (
    <div className="account__cards cards view-mode-grid">
      {accounts.map((account) => {
        return <AccountCard key={account.id} item={account} />;
      })}
    </div>
  );
};

export default Cards;
