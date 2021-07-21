import axios from 'axios';

const baseURL = 'http://localhost:5000';

const api = axios.create({ baseURL });

export const logIn = (formData) => api.post('/api/user/login', formData);
export const register = (formData) => api.post('/api/user/register', formData);
