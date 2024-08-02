const logService = require("../services/logService");

exports.createLog = async (req, res) => {
  try {
    const log = await logService.createLog(req.body);
    console.log(log);

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs(req.query.uid);
    console.log(logs);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
