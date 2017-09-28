document.querySelector('#nickname-text').addEventListener('change', e => {
  document.querySelector('#nickname').setAttribute('value', e.target.value);
}, false);

document.querySelector('#nickname-btn').addEventListener('click', () => {
  if (validateNickname()) {
    openChat();
  }
}, false);

document.querySelector('#nickname-text').addEventListener('keyup', e => {
  if (e.keyCode === 13 && validateNickname()) {
    openChat();
  }
});

function validateNickname() {
  const nickname = document.querySelector('#nickname').getAttribute('value');
  if (nickname) {
    return true;
  } else {
    return false;
  }
}

function openChat(e) {
  const ajax = new XMLHttpRequest();
  ajax.open('GET', 'client/chat.html', false);
  ajax.send();
  const page = ajax.responseText;

  document.querySelector('#container').innerHTML = page;

  const nickname = document.querySelector('#nickname').getAttribute('value');

  const socket = io();

  socket.emit('new-connect', nickname);

  const displayMsg = info => {
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

  socket.on('chat message', displayMsg);

  socket.on('info', displayMsg);
}
