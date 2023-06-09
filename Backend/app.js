const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let users = [];
let results = [];
let stats = [];
let placedShips = [];

io.on('connection', (socket) => {
  console.log('user connected: ' + socket.id);
  io.emit('create-user', users);
  io.emit('result', results);
  io.emit('stats', stats);

  socket.on('create-user', (user) => {
    users.push(user);
    console.log('Users: ', users);
    // console.log("Users: ", users[1].user);
    io.emit('create-user', users);
  });

  socket.on('chat', (message) => {
    console.log('Message: ', message);
    io.emit('chat', message);
  });

  socket.on('color-change', (colorChangeInfo) => {
    console.log(colorChangeInfo);
    const foundShip = placedShips.find(
      (ship) => ship.y === colorChangeInfo.y && ship.x === colorChangeInfo.x
    );
    console.log(foundShip);
    io.emit('color-change', colorChangeInfo);
    if (foundShip) {
      const hitter = { color: colorChangeInfo.user.color };
      const hittee = { color: foundShip.user.color };
      const hitStats = { hit: hitter.color, hitted: hittee.color };
      stats.push(hitStats);
      console.log(hitStats);
      results.push(foundShip.user)
      console.log(results);
      io.emit('result', results);
      io.emit('ship-hit', foundShip);
      socket.emit('hitter', { hit: true })
      io.emit('stats', stats);
    }
  });

  socket.on('game-reset', () => {
    io.emit('game-reset');
  });

  socket.on('result', (user) => {
    results.push(user);
    console.log('Result Users: ', results);
    io.emit('result', results);
  });

  socket.on('ship-placement', (placementInfo) => {
    console.log(placementInfo);
    placedShips.push(placementInfo);
    if (placedShips.length === users.length) {
      //  && placedShips.length >= 4
      io.emit('start-game', { gameStarted: true });
    }
  });
  socket.on('clear-everything', () => {

    users = [];

    results = [];

    placedShips = [];

    stats = [];

    console.log('Reset');

    console.log('users: ', users);

    console.log('placedShips: ', placedShips);

    console.log('results: ', results);

  });

});

module.exports = { app: app, server: server };
