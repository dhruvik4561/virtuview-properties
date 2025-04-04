import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("User added to online users:", userId);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log("Message sent to:", receiverId);
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        ...data,
        chatId: data.chatId
      });
      console.log("Message delivered to:", receiver.socketId);
    } else {
      console.log("Receiver not found or offline:", receiverId);
    }
  });

  socket.on("typing", ({ receiverId, senderId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("userTyping", senderId);
    }
  });

  socket.on("stopTyping", ({ receiverId, senderId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("userStoppedTyping", senderId);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
  });
});

io.listen("4000");
console.log("Socket server running on port 4000");
