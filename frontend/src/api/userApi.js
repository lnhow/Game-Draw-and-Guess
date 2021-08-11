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
  editProfile: (params) => {
    const url = '/user/updateUser';
    return axiosClient.post(url, { ...params });
  },
  updatePassword: (params) => {
    const url = '/user/updatePassword';
    return axiosClient.post(url, { ...params });
  },
  getAnonymousUser: (params) => {
    const url = '/user/getUser';
    return axiosClient.post(url, { ...params });
  },
};

export default UserApi;
