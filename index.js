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

io.on('connection', (socket) => {
  info.id = socket.id;
  info.msg = `Welcome! ${info.id} is connected!`;
  io.emit('info', info);

  socket.on('chat message', (msg) => {
    io.emit('chat message', {msg});
  });

  socket.on('disconnect', () => {
    info.id = socket.id;
    info.msg = `Bye~ ${info.id}!`;
    io.emit('info', info);
  });
});

http.listen(3000, () => {
  console.log('listening on *: 3000');
});
