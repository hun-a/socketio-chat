# What's this?
- This is tutorial about [socket.io](https://socket.io/get-started/chat/)

# How to run?
- clone this codes from [github](https://github.com/seunghun-kim/socketio-chat)
```
$ git clone git@github.com:seunghun-kim/socketio-chat.git
```
- install the dependencies
```
$ cd socketio-chat && npm install
```
- run the server
```
$ npm start
```
- connect chat client at your browser on `http://localhost:3000`!

# TO-DO
- [X] Broadcast a message to connected users when someone connects or disconnects
- [X] Add support for nicknames
- [ ] Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
- [ ] Add “{user} is typing” functionality
- [ ] Show who’s online
- [ ] Add private messaging
