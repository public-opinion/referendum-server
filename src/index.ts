#!/usr/bin/env node

import http from "http";
import net from "net"
import url, { URL } from "url";


import app from "./app";
import debug from "debug"

var dbg = debug('your-project-name:server');
 
 
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
 
/**
 * Create HTTP server.
 */
 
var server = http.createServer(app);
 
/**
 * Listen on provided port, on all network interfaces.
 */
 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

import WebSocket from "ws";
const wss = new WebSocket.Server({ noServer: true });
wss.on("connection", (ws, req) => {
  let s = new WebSocket('ws://localhost:8080' + req.url);
  s.once("open", () => {

    ws.on("message", (msg) => {
      console.log(msg.toString());
      s.send(msg.toString());
    })
    s.on("message", (msg: Buffer) => {
      console.log(msg.toString());
      ws.send(msg.toString());
    })
  })
})
server.on("upgrade", (request, socket, head) => {

  if(!request.url) return;

  console.log("UPGRADE:", request.url);
  if(request.url === '/sockjs-node'){
    wss.handleUpgrade(
      request, socket as net.Socket, head,
      (ws) => {
        wss.emit("connection", ws, request)
      }
    )
  } else{
    console.log("unhandled socket connection, url:", request.url);
    socket.destroy();
  }


})
 
/**
 * Normalize a port into a number, string, or false.
 */
 
function normalizePort(val: string) {
  var port = parseInt(val, 10);

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
function onError(error: NodeJS.ErrnoException ) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  dbg('Listening on ' + bind);
}
 