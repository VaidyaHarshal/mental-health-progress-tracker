const express = require("express");
const logController = require("../controllers/logController");
const router = express.Router();

// Route to create a new log entry.
router.post("/log", async (req, res, next) => {
  try {
    await logController.createLog(req, res);
  } catch (error) {
    next(error);
  }
});

// Route to get all log entries for a specific user.
router.get("/logs", async (req, res, next) => {
  try {
    await logController.getLogs(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
