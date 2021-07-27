import axiosClient from '../helpers/axiosClient';

// api/userApi.js
const UserApi = {
  login: (params) => {
    const url = '/user/login';
    return axiosClient.post(url, { ...params });
  },
  register: (params) => {
    const url = '/user/register';
    return axiosClient.post(url, { ...params });
  },
};

export default UserApi;
