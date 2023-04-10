import axios from 'axios';

const API_URL = 'https://unsplash-backend-mr2j.onrender.com/api';

export const getData = async (searchTerm: string) => {
  if (!searchTerm) return null;

  try {
    const response = await axios.get(`${API_URL}/search/photos`, {
      params: {
        query: searchTerm,
        per_page: 21,
      },
    });
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error occured during data fetching');
    return null;
  }
};

export const getDataById = async (id: string) => {
  if (!id) return null;

  try {
    const response = await axios.get(`${API_URL}/photos/${id}`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error occured during data fetching');
    return null;
  }
};
