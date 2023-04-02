import React from 'react';
import Card from '../Card/Card';

interface ICardsProps {
  products: IProduct[];
}

const Cards: React.FC<ICardsProps> = (props) => {
  const { products } = props;

  return (
    <div className="page__cards cards view-mode-grid">
      {products.map((product) => {
        return <Card key={product.id} item={product} />;
      })}
    </div>
  );
};

export default Cards;
