import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

//real time message code
export const getReceiverSocketId = (receiverId)=>{
  return users[receiverId];
}

const users = {};
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;
  if(userId) {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  }
  console.log("Online users:", Object.keys(users));
  io.emit("getonline", Object.keys(users));

  socket.on('disconnect', () => {
    console.log('Client disconnected',socket.id);
    delete users[userId];
    io.emit("getonline", Object.keys(users));
  });
});


export {app, server, io};   