import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="page__search-bar search-bar">
        <form className="search-bar__form" action="#" method="POST" encType="multipart/form-data">
          <label className="visually-hidden" htmlFor="search-field">
            Search for items
          </label>
          <div className="search-bar__holder">
            <input
              type="text"
              name="q"
              id="search-field"
              placeholder="Search..."
              autoComplete="off"
            />
            <button className="search-bar__button button button--clean" type="submit">
              <span className="visually-hidden">Search</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
