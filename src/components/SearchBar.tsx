import React from 'react';

interface ISearchBarState {
  searchTerm: string;
}

class SearchBar extends React.Component<object, ISearchBarState> {
  constructor(props: object) {
    super(props);

    const searchTerm = this.getSearchTerm();

    this.state = {
      searchTerm,
    };
  }

  componentDidMount() {
    const searchTerm = this.getSearchTerm();
    this.setState({ searchTerm });
  }

  componentWillUnmount() {
    const { searchTerm } = this.state;
    this.setSearchTerm(searchTerm);
  }

  // eslint-disable-next-line class-methods-use-this
  getSearchTerm = () => {
    return localStorage.getItem('searchTerm') || '';
  };

  // eslint-disable-next-line class-methods-use-this
  setSearchTerm = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target?.value });
  };

  // eslint-disable-next-line class-methods-use-this
  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="page__search-bar search-bar">
        <form
          className="search-bar__form"
          action="/"
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.handleFormSubmit}
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
              onChange={this.handleInputChange}
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
