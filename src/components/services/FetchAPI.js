import axios from 'axios';

const API_KEY = '32042455-62ff17051f805cdef5e52ab83';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async ({ query, page }) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
