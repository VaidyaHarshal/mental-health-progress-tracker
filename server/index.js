const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const logRoutes = require("./routes/logRoutes");
const { io } = require("./io");

const app = express();
const server = http.createServer(app);

io.attach(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Routes setup
app.use("/api", logRoutes);

// WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(5000, () => console.log("Server running on port 5000"));

module.exports = { io };
