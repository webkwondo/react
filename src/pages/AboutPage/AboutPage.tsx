import React from 'react';

interface IAboutPageProps {
  onPageChange: (pageName: string) => void;
}

class AboutPage extends React.Component<IAboutPageProps> {
  componentDidMount() {
    const { onPageChange } = this.props;
    onPageChange('About');
  }

  render() {
    return (
      <main className="page__main page__main--about">
        <div className="page__main-content">
          <div className="page__title">
            <div className="page__title-container container">
              <h1 className="page__title-copy">About us</h1>
            </div>
          </div>

          <section className="page__about about">
            <div className="about__container container">
              <p>
                Velit aut accusantium cum dolorum eveniet excepturi amet recusandae alias, deserunt
                fugiat debitis vitae inventore non. Eos cumque repudiandae cupiditate natus magni,
                fugit quo provident, nemo, neque vero ea praesentium! Amet totam eius laboriosam
                explicabo optio rem molestiae vero, provident molestias consequuntur recusandae
                repudiandae obcaecati libero, consectetur quasi, accusamus veritatis maxime? Dolorem
                facilis molestias deserunt optio reprehenderit, ad nisi accusantium! Dolore natus,
                ea ducimus nostrum quasi sint reprehenderit eligendi. Dolorum ullam alias commodi
                aliquam minima animi nobis dolores, delectus ducimus architecto voluptates debitis
                perferendis ea excepturi obcaecati itaque hic tenetur. Unde, deleniti magni,
                reiciendis sed adipisci minus ex in sit sapiente vero rem. Animi ipsam ut hic
                reiciendis, maxime veritatis minus perspiciatis perferendis quos dicta aperiam
                soluta veniam. Quo, ipsum. Similique nam animi incidunt accusantium! Dolores, quas.
                Earum harum pariatur, nobis odit, sequi a ipsam fugiat odio, modi dolor
                exercitationem reprehenderit sint consequatur dolorem! Quia quis sunt pariatur nobis
                ex. Optio natus ea, quod cumque ipsam consequatur iure sint molestias quae
                voluptatibus totam non aut excepturi! Dignissimos unde veritatis voluptates, ut eos
                veniam harum corrupti obcaecati, nesciunt, nam ex fugit. Autem sint et, labore
                perferendis ex deserunt iure inventore voluptate quod asperiores accusamus corporis
                tenetur fuga modi illo, earum veritatis, accusantium sunt dolorem consequuntur.
                Possimus maiores ad sint voluptates in!
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

export default AboutPage;
