import io from 'socket.io-client';
import { baseURL } from './api';

export const connectToSocket = () => {
  return io.connect(baseURL, {
    //config
  });
};
