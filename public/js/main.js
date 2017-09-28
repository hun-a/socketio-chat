document.querySelector('#nickname-text').focus();

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

  document.querySelector('#m').focus();

  const displayMsg = info => {
    const li = document.createElement('li');

    if (info.key) {
      li.innerHTML = info.msg;
      li.setAttribute(info.key, info.value);
    } else {
      const idDiv = document.createElement('div');
      idDiv.setAttribute('class', 'chat-nickname');
      const msgDiv = document.createElement('div');
      msgDiv.setAttribute('class', 'chat-message');
      idDiv.innerHTML = info.id;
      msgDiv.innerHTML = info.msg;
      li.appendChild(idDiv);
      li.appendChild(msgDiv);
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

  socket.on('disconnect', () => {
    socket.close();
  });
}
