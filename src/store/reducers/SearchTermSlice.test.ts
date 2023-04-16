import searchTermReducer, { changed } from './SearchTermSlice';

describe('searchTerm reducer', () => {
  const initialState = {
    searchTerm: '',
  };

  it('should change the search term', () => {
    const action = changed('canyon');
    const state = searchTermReducer(initialState, action);

    expect(state.searchTerm).toBe('canyon');
  });

  it('should handle unknown action', () => {
    const action = { type: 'unknown' };
    const state = searchTermReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
