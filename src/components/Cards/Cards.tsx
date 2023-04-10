import React, { useState } from 'react';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';

interface CardsProps {
  items: Item[];
}

const Cards: React.FC<CardsProps> = (props) => {
  const { items } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleCardClick = (event: React.MouseEvent<HTMLElement> | MouseEvent, item: Item) => {
    event.preventDefault();
    setIsModalOpen(true);
    setCurrentItem(item);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="page__cards cards view-mode-grid">
        {items.map((item) => {
          return <Card key={item.id} item={item} onCardClick={handleCardClick} />;
        })}
      </div>
      {currentItem && (
        <Modal
          key={currentItem.id}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          id={currentItem.id}
        />
      )}
    </>
  );
};

export default Cards;
