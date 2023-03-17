import React from 'react';
import appData from '../data/data.json';
import Card from './Card';

class Cards extends React.Component {
  data: IAppData = appData as IAppData;

  render() {
    return (
      <div className="page__cards cards view-mode-grid">
        {this.data.products.map((product) => {
          return <Card key={product.id} item={product} />;
        })}
      </div>
    );
  }
}

export default Cards;
