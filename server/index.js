const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to your frontend's URL
    methods: ["GET", "POST"],
  },
});
const logRoutes = require("./routes/logRoutes");

// Setup middleware and routes
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json()); // For parsing application/json
app.use("/api", logRoutes);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/api/log", (req, res) => {
  const newLog = req.body; // Example log object
  io.emit("logUpdate", newLog); // Emit the new log to all connected clients
  res.status(200).send(newLog);
});

// Start server
server.listen(5000, () => console.log("Server running on port 5000"));

module.exports = { io }; // Export io for use in other files
