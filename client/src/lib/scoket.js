import { io } from "socket.io-client";
 
let socket = null;
 
export const connectSocket = (userId) => {
  if (socket?.connected) return socket;
 
  socket = io("http://localhost:8000", { transports: ["websocket"] });
 
  socket.on("connect", () => {
    socket.emit("register", userId);
    console.log("Socket connected & registered:", userId);
  });
 
  return socket;
};
 
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
 
export const getSocket = () => socket;
 