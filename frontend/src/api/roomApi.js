import axiosClient from '../helpers/axiosClient';

const RoomApi = {
  create: (params) => {
    const url = '/room/create'; 
    return axiosClient.post(url, {...params});
  },
  get: () => {
    const url = '/room';
    return axiosClient.get(url);
  },
//   update: (id) => {
//     const url = '/room/category';
//     return axiosClient.put(url + `/${id}`);
//   },
//   delete: (id) => {
//     const url = '/room/category';
//     return axiosClient.delete(url + `/${id}`);
//   },
};

export default RoomApi;
