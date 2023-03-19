import React from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <div className="header__menu menu">
        <nav className="menu__nav">
          <ul className="menu__list">
            <li className="menu__item">
              <NavLink to="/" className="menu__link link link--dark">
                Home
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to="/about" className="menu__link link link--dark">
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Menu;
