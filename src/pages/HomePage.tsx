import React from 'react';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';

interface IHomePageProps {
  onPageChange: (pageName: string) => void;
}

class HomePage extends React.Component<IHomePageProps> {
  componentDidMount() {
    const { onPageChange } = this.props;
    onPageChange('Home');
  }

  render() {
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
              <Cards />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo veniam eligendi
                perspiciatis harum maxime consequatur dolore magnam explicabo eos, blanditiis a
                dolorum culpa vero, in asperiores minus illo repudiandae! Numquam non praesentium
                quam quod, eos debitis aperiam tempora reiciendis iure dolores blanditiis nemo
                quaerat perspiciatis minima quis deleniti, autem reprehenderit, repudiandae impedit
                beatae dicta. Dolorum in impedit deserunt blanditiis. Quae culpa a fuga quo aperiam
                repudiandae architecto tempora maxime corporis cupiditate earum consequatur unde,
                nemo quaerat, fugiat sunt necessitatibus, voluptas eligendi vero! Harum sed ducimus
                quos corrupti mollitia commodi. Perspiciatis harum aut nisi officiis ducimus facere
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
  }
}

export default HomePage;
