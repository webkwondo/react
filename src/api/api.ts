import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = 'https://unsplash-backend-mr2j.onrender.com/api';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getItems: builder.query<SearchApiResponse, string>({
      query: (searchTerm: string) => ({
        url: '/search/photos',
        params: {
          query: searchTerm,
          per_page: 21,
        },
      }),
    }),
    getItem: builder.query<Item, string>({
      query: (id: string) => ({
        url: `/photos/${id}`,
      }),
    }),
  }),
});

export default itemsApi.reducer;
export const { useGetItemsQuery, useGetItemQuery } = itemsApi;
