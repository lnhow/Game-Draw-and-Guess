import { Server } from 'socket.io';

import * as UserSocket from './users.socket.js';

let io;
export default function (httpServer) {
  if (httpServer) {
    io = new Server(httpServer, {
      cors: {
        origin: '*', //Allow origin from anywhere, only for testing
      },
    });
    io.on('connection', (socket) => {
      //Callback for error handling
      socket.on('join', ({ name, room }, callback) => {
        console.log(`User ${name} want to join room ${room}`);
        //Temporarily use socket.id as user id
        const { user, error } = UserSocket.addUser({
          id: socket.id,
          name,
          room,
        });

        if (error) {
          return callback(error);
        }

        socket.join(user.room);
        console.log(`User ${user.name} joined room ${user.room}`);
        // Update list of users in room
        io.to(user.room).emit('room-users', {
          room: user.room,
          users: UserSocket.getUsersInRoom(user.room),
        });
        callback();
      });
      socket.on('message', ({ message }, callback) => {
        const user = UserSocket.getUser(socket.id);
        if (user) {
          io.to(user.room).emit('message', {
            user: user.name,
            message: message,
          });
        }
        if (callback) {
          callback();
        }
      });

      socket.on('canvas-data', (drawData, callback) => {
        const user = UserSocket.getUser(socket.id);
        if (user) {
          io.to(user.room).emit('canvas-data', drawData);
        }
        if (callback) {
          callback();
        }
      });

      socket.on('disconnect', () => {
        const user = UserSocket.removeUser(socket.id);

        if (user) {
          // Broadcast to room that user had left
          // Update list of users in room
          io.to(user.room).emit('room-users', {
            room: user.room,
            users: UserSocket.getUsersInRoom(user.room),
          });
        }
      });
    });
  }
  return io;
}
