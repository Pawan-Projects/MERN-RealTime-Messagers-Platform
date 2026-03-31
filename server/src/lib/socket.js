import { Server } from "socket.io";

let io;
const users = new Map(); // userId -> socketId

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // register user
  socket.on("register", (userId) => {
  if (users.has(userId)) {
    console.log("User already registered, updating socket");
  }

  users.set(userId, socket.id);

  console.log("REGISTERED:", userId);
  console.log("USERS MAP:", users);
});

    // disconnect
    socket.on("disconnect", () => {
      for (let [userId, socketId] of users) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
      console.log("User disconnected");
    });
  });
};

// 🔥 IMPORTANT: ye hi missing tha
export const emitMessage = (receiverId, message) => {
  const socketId = users.get(receiverId);
    console.log("EMIT TO:", receiverId);
  console.log("USERS MAP:", users);
  console.log("FOUND SOCKET:", users.get(receiverId));
  

  if (socketId && io) {
    io.to(socketId).emit("receiveMessage", message);
  }
};

