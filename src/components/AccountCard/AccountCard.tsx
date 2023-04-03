import React from 'react';

interface IAccountCardProps {
  item: IAccountData;
}

const AccountCard: React.FC<IAccountCardProps> = (props) => {
  const { item } = props;
  const { id, name, dob, country, policy, notifications, contact, image } = item;

  return (
    <div className="card" data-testid="account-card">
      <div className="card__inner">
        {image ? (
          <div className="card__image">
            <figure>
              <img className="card__img" src={URL.createObjectURL(image)} alt="Profile" />
            </figure>
          </div>
        ) : (
          ''
        )}

        <div className="card__info">
          <h3 className="card__title">Account {id}</h3>

          <div className="card__info-line">
            Name:
            <span className="card__info-line-value"> {name}</span>
          </div>

          <div className="card__info-line">
            Date of birth:
            <span> {dob}</span>
          </div>

          <div className="card__info-line">
            Country:
            <span> {country}</span>
          </div>

          <div className="card__info-line">
            Contact:
            <span> {contact ? contact.charAt(0).toUpperCase() + contact.slice(1) : ''}</span>
          </div>

          <div className="card__info-line">
            Policy status:
            <span> {policy ? 'Agreed' : 'Not confirmed'}</span>
          </div>

          <div className="card__info-line">
            Notifications:
            <span> {notifications ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
