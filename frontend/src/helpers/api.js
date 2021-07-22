import axios from 'axios';

const baseURL = 'http://localhost:5000';

const api = axios.create({ baseURL });

export default api;

export const getCategories = () => {
  return axios.get('/data/categories.json');
};
