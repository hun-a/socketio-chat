const socket = io();

const addLiTag = info => {
  const li = document.createElement('li');
  li.innerHTML = info.msg;
  if (info.key) {
    li.setAttribute(info.key, info.value);
  }
  document.getElementById('messages').appendChild(li);
};

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('m');
  socket.emit('chat message', msg.value);
  msg.value = '';
}, false);

socket.on('chat message', addLiTag);

socket.on('info', addLiTag);
