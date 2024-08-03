const logService = require("../services/logService");
const { io } = require("../io");

exports.createLog = async (req, res) => {
  try {
    const log = await logService.createLog(req.body);
    io.emit("logUpdate", log); // Emit the new log to all connected clients
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs(req.query.uid);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
