import React from 'react';
import Menu from './Menu';

class Header extends React.Component {
  render() {
    return (
      <header className="page__header header">
        <div className="header__container container">
          <Menu />
        </div>
      </header>
    );
  }
}

export default Header;
