import axiosClient from '../helpers/axiosClient';

const CategoryApi = {
  create: (params) => {
    const url = '/room/category';
    return axiosClient.post(url, { ...params });
  },
  get: () => {
    const url = '/room/category';
    return axiosClient.get(url);
  },
  update: (id) => {
    const url = '/room/category';
    return axiosClient.put(url + `/${id}`);
  },
  delete: (id) => {
    const url = '/room/category';
    return axiosClient.delete(url + `/${id}`);
  },
};

export default CategoryApi;
