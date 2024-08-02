const logModel = require("../models/logModel");

exports.createLog = async (logData) => {
  return await logModel.createLog(logData);
};

exports.getLogs = async (uid) => {
  return await logModel.getLogs(uid);
};
