const express = require("express");
const logController = require("../controllers/logController");
const router = express.Router();

router.post("/log", logController.createLog);
router.get("/logs", logController.getLogs);

module.exports = router;
