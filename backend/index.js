/**
 * This is the main file that start running everything
 */
import * as http from 'http';
import app from './server.js';
import dotenv from 'dotenv';
import socketIoConfig from './socket/index.socket.js';

dotenv.config();
const port = process.env.PORT ? process.env.PORT : 5000;

const server = http.createServer(app);
socketIoConfig(server);

server.listen(port, () => {
  console.log(`Backend server started. Listening on port ${port}`);
});
