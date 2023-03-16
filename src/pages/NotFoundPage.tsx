import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {
  render() {
    return (
      <section className="about">
        <h1>Not Found</h1>
        <p>
          The page that you looking for does not exist.
          <br />
          You can go to the <Link to="/">home</Link> page.
        </p>
      </section>
    );
  }
}

export default NotFoundPage;
