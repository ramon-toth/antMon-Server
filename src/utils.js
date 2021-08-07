export function getSocketIP(socket) {
  return socket.handshake.address.split(':')[3];
}
