import React from 'react';
import Card from '../Card/Card';

interface ICardsProps {
  products: IProduct[];
}

class Cards extends React.Component<ICardsProps> {
  render() {
    const { products } = this.props;

    return (
      <div className="page__cards cards view-mode-grid">
        {products.map((product) => {
          return <Card key={product.id} item={product} />;
        })}
      </div>
    );
  }
}

export default Cards;
