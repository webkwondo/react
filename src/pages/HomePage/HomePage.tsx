import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/Cards/Cards';
import { useGetItemsQuery } from '../../api/api';
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator';

interface HomePageProps {
  onPageChange: (pageName: string) => void;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { onPageChange } = props;
  const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);
  const { data, isLoading, error } = useGetItemsQuery(searchTerm);
  const items = data?.results || null;

  useEffect(() => {
    onPageChange('Home');
  }, [onPageChange]);

  const getCards = () => {
    return items && items.length ? (
      <Cards items={items} />
    ) : (
      <p className="home__loading-empty">No results</p>
    );
  };

  return (
    <main className="page__main page__main--home">
      <div className="page__main-content">
        <div className="page__title">
          <div className="page__title-container container">
            <h1 className="page__title-copy">Home</h1>
          </div>
        </div>

        <section className="page__home home">
          <div className="home__container container">
            <SearchBar />
            {isLoading && <ProgressIndicator isLoading={isLoading} />}
            {!isLoading && !error && getCards()}
            {error && (
              <p className="home__loading-error" role="alert">
                There was an error. Please, try again
              </p>
            )}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo veniam eligendi
              perspiciatis harum maxime consequatur dolore magnam explicabo eos, blanditiis a
              dolorum culpa vero, in asperiores minus illo repudiandae! Numquam non praesentium quam
              quod, eos debitis aperiam tempora reiciendis iure dolores blanditiis nemo quaerat
              perspiciatis minima quis deleniti, autem reprehenderit, repudiandae impedit beatae
              dicta. Dolorum in impedit deserunt blanditiis. Quae culpa a fuga quo aperiam
              repudiandae architecto tempora maxime corporis cupiditate earum consequatur unde, nemo
              quaerat, fugiat sunt necessitatibus, voluptas eligendi vero! Harum sed ducimus quos
              corrupti mollitia commodi. Perspiciatis harum aut nisi officiis ducimus facere
              quisquam non, voluptatum consectetur suscipit ab nostrum nesciunt, nihil quidem sint
              ut temporibus consequuntur! Provident modi adipisci iure facere ipsam eligendi! Non,
              autem? Quo, tempora nam ullam omnis placeat laborum et veritatis nihil vel nemo
              incidunt! Nobis numquam quis, illo minus pariatur qui id adipisci perspiciatis non
              explicabo saepe a? Vel, magnam mollitia.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
