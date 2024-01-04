
const express = require('express');
const { join } = require('path'); // Fix typo in require statement
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
  
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('send message', msg);
    });
  
    socket.on('typing', () => {
      socket.broadcast.emit('show typing status');
    });
  
    socket.on('stoptyping', () => {
      socket.broadcast.emit('showstoptyping');
    });
  });

server.listen(3000, () => {
  console.log('server at http://localhost:3000');
});
