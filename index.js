const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const info = {
  id: '',
  msg: '',
  key: 'id',
  value: 'info'
};

const userList = {};

io.on('connection', (socket) => {

  socket.on('new-connect', nickname => {
    userList[socket.id] = nickname;
    info.id = nickname;
    info.msg = `Welcome! ${info.id} is connected!`;
    io.emit('info', info);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', {msg});
  });

  socket.on('disconnect', () => {
    info.id = userList[socket.id];
    info.msg = `${info.id} has disconnected!`;
    io.emit('info', info);
  });
});

http.listen(3000, () => {
  console.log('listening on *: 3000');
});
