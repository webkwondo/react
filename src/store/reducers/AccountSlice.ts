/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  accounts: AccountData[];
}

const initialState: InitialState = {
  accounts: [],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    added: (state, action: PayloadAction<AccountData>) => {
      state.accounts = [...state.accounts, action.payload];
    },
  },
});

export default accountSlice.reducer;
export const { added } = accountSlice.actions;
