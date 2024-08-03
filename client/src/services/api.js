import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createLog = (logData) => api.post("/log", logData);
export const getLogs = (uid) => api.get(`/logs?uid=${uid}`);
