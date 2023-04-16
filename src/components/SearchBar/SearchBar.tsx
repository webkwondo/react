import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changed } from '../../store/reducers/SearchTermSlice';

const SearchBar = () => {
  const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);
  const dispatch = useAppDispatch();
  const searchField = React.useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSearchTerm =
      searchField && searchField.current && searchField.current instanceof HTMLInputElement
        ? searchField.current.value
        : '';
    dispatch(changed(newSearchTerm));
  };

  return (
    <div className="page__search-bar search-bar">
      <form
        className="search-bar__form"
        action="/"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <label className="visually-hidden" htmlFor="search-field">
          Search for items
        </label>
        <div className="search-bar__holder">
          <input
            type="text"
            name="q"
            id="search-field"
            placeholder="Type something then press Enter..."
            autoComplete="off"
            defaultValue={searchTerm}
            ref={searchField}
          />
          <button className="search-bar__button button button--clean" type="submit">
            <span className="visually-hidden">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
