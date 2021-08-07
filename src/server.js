import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { insertStats } from './mysql.js';
import { getSocketIP } from './utils.js';
import { httpListener } from './controller.js';

dotenv.config();

const httpServer = createServer(httpListener);
const io = new Server(httpServer, {});

export var LATEST_STATS = [];

io.use(authenticate);

io.on('connection', (socket) => {
  var farm;

  socket.on('farm', (f) => {
    farm = f;
    console.log('Connected farm:', farm.name);
    socket.join(farm);
  });

  socket.on('message', (msg) => {
    msg.map((data) => data.stats && insertStats(data));
    LATEST_STATS = msg;
  });

  socket.on('disconnect', () => {
    console.log('Farm Disconnected');
  });
});

httpServer.listen(3033);

function authenticate(socket, next) {
  const token = socket.handshake.auth.token;
  if (token === process.env.API_KEY) {
    next();
  } else {
    const err = new Error('Connection Error: Unauthorized!');
    console.log('Unauthorized connection attempt from:', getSocketIP(socket));
    next(err);
  }
}