import React from 'react';
import Menu from '../Menu/Menu';

interface IHeaderProps {
  currentPageName: string;
}

class Header extends React.Component<IHeaderProps> {
  render() {
    const { currentPageName } = this.props;

    return (
      <header className="page__header header">
        <div className="header__container container">
          <div className="header__inner">
            <Menu />
            <span className="header__current-page-name">Currently viewing: {currentPageName}</span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
