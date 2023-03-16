import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <div className="header__menu menu">
        <nav className="menu__nav">
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/" className="menu__link link link--dark">
                Home
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/about" className="menu__link link link--dark">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Menu;
