const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require("cors");

// Middleware setup
app.use(cors());
app.use(express.json()); // Ensure this is added

app.post("/api/log", (req, res) => {
  const newLog = req.body; // Should contain the request body
  console.log("New log", newLog); // Print the log object
  io.emit("logUpdate", newLog); // Emit the new log to all connected clients
  res.status(200).send(newLog);
});

// Start server
server.listen(5000, () => console.log("Server running on port 5000"));
