import { configureStore } from '@reduxjs/toolkit';
import itemsApiReducer, { itemsApi } from '../api/api';
import accountReducer from './reducers/AccountSlice';
import searchTermReducer from './reducers/SearchTermSlice';

const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    [itemsApi.reducerPath]: itemsApiReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'itemsApi/executeQuery/pending',
          'itemsApi/executeQuery/fulfilled',
          'itemsApi/executeQuery/rejected',
        ],
        ignoredActionPaths: ['payload.image'],
        ignoredPaths: ['account.accounts'],
      },
    }).concat(itemsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
