const socket = io();

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('m');
  socket.emit('chat message', msg.value);
  msg.value = '';
}, false);

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  document.getElementById('messages').appendChild(li);
});
