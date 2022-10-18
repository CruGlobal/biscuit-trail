#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
// import debug from 'debug'('thryve-rest-api:server'_;
import http from 'http';
import { Server, Socket } from 'socket.io';
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "@redis/client";
import socketHandler from './socket';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const io = new Server(server);

const redisConfig = {
  host: process.env.SESSION_REDIS_HOST || 'localhost',
  port: process.env.SESSION_REDIS_PORT || '6379',
  db: process.env.SESSION_REDIS_DB_INDEX || '0'
}

const pubClient = createClient( {url: `redis://${redisConfig.host}:${redisConfig.port}/${redisConfig.db}`} );
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket: Socket) => {
    socketHandler(socket);
  });

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  // debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}
