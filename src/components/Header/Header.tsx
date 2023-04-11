import React from 'react';
import Menu from '../Menu/Menu';

interface HeaderProps {
  currentPageName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { currentPageName } = props;

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
};

export default Header;
