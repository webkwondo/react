/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  searchTerm: string;
}

const initialState: InitialState = {
  searchTerm: '',
};

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    changed: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export default searchTermSlice.reducer;
export const { changed } = searchTermSlice.actions;
