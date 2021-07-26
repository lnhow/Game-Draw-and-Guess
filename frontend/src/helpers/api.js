import axios from 'axios';

const baseURL = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'http://localhost:5000/api';

const api = axios.create({ baseURL });

export default api;
