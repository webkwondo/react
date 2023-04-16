import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { itemsApi, API_URL } from './api';

const server = setupServer(
  rest.get(`${API_URL}/search/photos`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    return res(
      ctx.json([
        { id: '1', title: `${query} photo 1`, description: 'description 1', image: 'image 1' },
        { id: '2', title: `${query} photo 2`, description: 'description 2', image: 'image 2' },
        { id: '3', title: `${query} photo 3`, description: 'description 3', image: 'image 3' },
      ]),
      ctx.status(200)
    );
  }),

  rest.get(`${API_URL}/photos/:id`, (req, res, ctx) => {
    const id = req.params.id as string;
    return res(
      ctx.json({
        id,
        title: `photo ${id}`,
        description: 'description',
        image: 'image',
      }),
      ctx.status(200)
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('itemsApi', () => {
  describe('getItems', () => {
    it('should return items for a given search term', async () => {
      const { result } = renderHook(() => itemsApi.endpoints.getItems.useQuery('test'), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([
        { id: '1', title: 'test photo 1', description: 'description 1', image: 'image 1' },
        { id: '2', title: 'test photo 2', description: 'description 2', image: 'image 2' },
        { id: '3', title: 'test photo 3', description: 'description 3', image: 'image 3' },
      ]);
    });
  });

  describe('getItem', () => {
    it('should return an item for a given ID', async () => {
      const { result } = renderHook(() => itemsApi.endpoints.getItem.useQuery('1'), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual({
        id: '1',
        title: 'photo 1',
        description: 'description',
        image: 'image',
      });
    });
  });
});
