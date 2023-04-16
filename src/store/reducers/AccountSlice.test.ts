import { describe, it } from 'vitest';
import accountReducer, { added } from './AccountSlice';

describe('accountSlice', () => {
  it('should add an account to the state', () => {
    const initialState = {
      accounts: [],
    };

    const file = new File([new Uint8Array(10)], 'profile.png', { type: 'image/png' });

    const newAccount: AccountData = {
      id: '1',
      name: 'Jane Dawn',
      dob: '2002-01-01',
      country: 'Argentina',
      policy: true,
      notifications: false,
      contact: 'Email',
      image: file,
    };

    const action = added(newAccount);
    const newState = accountReducer(initialState, action);
    expect(newState.accounts).toEqual([newAccount]);
  });
});
