import io from 'socket.io-client';
import { baseURL } from './api';

let socket = null;
export const connectToSocket = () => {
  socket = io.connect(baseURL, {
    //config
  });
  return socket;
};
