import axios from 'axios';

export const baseURL = 'http://localhost:5000';

const api = axios.create({ baseURL });

export default api;

export const getCategories = () => {
  return axios.get('/data/categories.json');
};

export const getRoomPlayers = (roomId) => {
  return axios.get('/data/playerRoom.json');
};
