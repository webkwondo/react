import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NotFoundPageProps {
  onPageChange: (pageName: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { onPageChange } = props;

  useEffect(() => {
    onPageChange('Not Found');
  }, [onPageChange]);

  return (
    <main className="page__main page__main--not-found">
      <div className="page__main-content">
        <div className="page__title">
          <div className="page__title-container container">
            <h1 className="page__title-copy">Not Found</h1>
          </div>
        </div>

        <section className="page__not-found not-found">
          <div className="not-found__container container">
            <p>
              The page that you looking for does not exist.
              <br />
              You can go to the
              <Link to="/" className="link">
                {' '}
                home{' '}
              </Link>
              page.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFoundPage;
