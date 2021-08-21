export function getSocketIP(socket) {
  return socket.handshake.address.split(':')[3];
}

export function timestamp() {
  return `[${new Date().toLocaleString('en-US')}] -`;
}
