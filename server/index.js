require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { io } = require("./io");
const logRoutes = require("./routes/logRoutes");

const app = express();
const server = http.createServer(app);

const PORT = process.env.VITE_PORT || 5000;
const CLIENT_ORIGIN = process.env.VITE_CLIENT_ORIGIN || "http://localhost:5173";

io.attach(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Middleware setup
app.use(
  cors({
    origin: CLIENT_ORIGIN,
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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };
