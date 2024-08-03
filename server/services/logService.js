const logModel = require("../models/logModel");

exports.createLog = async (logData) => {
  try {
    return await logModel.createLog(logData);
  } catch (error) {
    console.error("Error creating log:", error);
    throw new Error("Could not create log. Please try again.");
  }
};

exports.getLogs = async (uid) => {
  try {
    return await logModel.getLogs(uid);
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw new Error("Could not fetch logs. Please try again.");
  }
};
