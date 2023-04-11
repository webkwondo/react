import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getData } from './api';

describe('api', () => {
  describe('getData', () => {
    let mock: MockAdapter;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.restore();
    });

    it('should return null when no search term is provided', async () => {
      const result = await getData('');

      expect(result).toBeNull();
    });
  });
});
