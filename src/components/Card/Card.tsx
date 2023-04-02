import React from 'react';

interface ICardProps {
  item: IProduct;
}

class Card extends React.Component<ICardProps> {
  render() {
    const { item } = this.props;
    const { title, brand, category, rating, stock, description, price, discountPercentage } = item;

    return (
      <div className="card" data-testid="card">
        <div className="card__inner">
          <div className="card__image">
            <figure>
              <img
                className="card__img"
                src="/assets/images/img/product-default.jpg"
                alt="Product"
              />
            </figure>
          </div>

          <div className="card__info">
            <h3 className="card__title">{title}</h3>

            <div className="card__meta">
              <div className="card__brand">
                <div className="badge badge--basic">
                  <div className="badge__inner">
                    <span>{brand}</span>,
                  </div>
                </div>
              </div>

              <div className="card__category">
                <div className="badge badge--orange">
                  <div className="badge__inner">
                    <span>{category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card__rating">
              Rating:
              <span className="card__rating-value"> {rating}</span>
            </div>

            <div className="card__stock">
              <span>{stock ? `${stock} in stock` : `not in stock`}</span>
            </div>

            <div className="card__description">
              {description.split(' ').slice(0, 16).join(' ')}...
            </div>

            <div className="card__footer">
              <div className="card__price">
                {discountPercentage ? (
                  <span className="card__price-old">
                    ${parseFloat(price.toString()).toFixed(2)}
                  </span>
                ) : (
                  ''
                )}
                <span className="card__price-new">
                  $
                  {discountPercentage
                    ? parseFloat(((price * (100 - discountPercentage)) / 100).toString()).toFixed(2)
                    : parseFloat(price.toString()).toFixed(2)}
                </span>
              </div>

              {discountPercentage ? (
                <span className="card__discount">-{discountPercentage}%</span>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
