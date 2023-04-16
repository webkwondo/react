import React from 'react';
import { cropPhrase, formatPhrase } from '../Utils/Utils';

interface CardProps {
  item: Item;
  onCardClick: (event: React.MouseEvent<HTMLElement> | MouseEvent, item: Item) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { item, onCardClick } = props;
  const { urls, alt_description: altDescription, likes, user } = item;
  const { small } = urls;
  const { username } = user;
  const formattedAlt = formatPhrase(altDescription);

  return (
    <a href="/" className="card" data-testid="card" onClick={(event) => onCardClick(event, item)}>
      <div className="card__inner">
        <div className="card__image">
          <figure>
            <img className="card__img" src={small} alt={formattedAlt} />
          </figure>
        </div>

        <div className="card__info">
          <div className="card__description">{cropPhrase(formattedAlt)}</div>

          <div className="card__footer">
            <div className="card__by">
              By:
              <span className="card__by-value"> {username}</span>
            </div>
            <div className="card__likes">
              Likes:
              <span className="card__likes-value"> {likes}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
