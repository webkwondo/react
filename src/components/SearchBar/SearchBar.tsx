import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const searchTermRef = React.useRef<string>(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
    const term = localStorage.getItem('searchTerm');

    if (term !== null) {
      setSearchTerm(term);
    }

    return () => {
      localStorage.setItem('searchTerm', searchTermRef.current);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            placeholder="Search..."
            autoComplete="off"
            value={searchTerm}
            onChange={handleInputChange}
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
