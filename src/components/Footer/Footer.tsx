import React from 'react';

const Footer = () => {
  return (
    <footer className="page__footer footer">
      <div className="footer__container container">
        <h2 className="visually-hidden">Site Footer</h2>

        <div className="footer__row footer__row--copyright copyright">
          <p className="footer__copyright">
            <span>
              © <a href="https://github.com/webkwondo">Webkwondo</a>, 2023
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
