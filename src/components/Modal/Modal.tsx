import React, { useEffect, useState } from 'react';
import { formatDate, wait, formatPhrase } from '../Utils/Utils';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import { getDataById } from '../../api/api';

interface ModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, isOpen, id } = props;
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement> | MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const loadData = async (itemId: string) => {
      setIsContentLoading(true);
      await wait(2);
      const data = await getDataById(itemId);
      if (!data) setItem(null);
      if (data) setItem(data);
      setIsContentLoading(false);
    };

    loadData(id);
  }, [id]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'opened' : ''}`} onMouseDown={handleMouseDown}>
      <div className="modal">
        {isContentLoading && <ProgressIndicator isLoading={isContentLoading} />}
        {!isContentLoading && item && (
          <>
            <img
              className="modal__img"
              src={item.urls.regular}
              alt={formatPhrase(item.alt_description)}
            />
            <div className="modal__content">
              <h2 className="modal__title">{formatPhrase(item.alt_description)}</h2>
              <p className="modal__date">{formatDate(item.created_at)}</p>
              <div className="modal__author">
                <img
                  className="modal__author-img"
                  src={item.user.profile_image.medium}
                  alt={item.user.name}
                />
                <p className="modal__author-name">{item.user.name}</p>
                <p className="modal__author-username">@{item.user.username}</p>
              </div>
            </div>
          </>
        )}
        <button className="modal__close" onClick={onClose} type="button">
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default Modal;
