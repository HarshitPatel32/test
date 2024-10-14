import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = createServer(app);

const corsOptions = {
  origin: process.env.NEXT_PUBLIC_ORIGIN_ENDPOINT,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  transports: ["websocket", "polling"],
};
app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
});

export const handleSocketService = (io) => {
  io.on("connection", (socket) => {
    const { uuid } = socket.handshake.query;
    if (!uuid) {
      console.error("UUID missing in socket handshake.");
      socket.disconnect(true);
      return;
    }
    console.log(`Client connected: ${socket.id} with UUID: ${uuid}`);

    socket.on("message", async ({ Name, message }) => {
      if (!Name || !message) {
        console.log("Invalid message payload");
        return;
      }
      io.emit("send", { Name, message });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id, "UUID:", uuid);
    });
  });
};

const PORT = process.env.NEXT_PUBLIC_SOCKET_PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default (req, res) => {
  if (!res.socket.server.io) {
    console.log("Initializing new Socket.IO instance");
    res.socket.server.io = io;
    handleSocketService(res.socket.server.io);
  }
  res.end();
};
