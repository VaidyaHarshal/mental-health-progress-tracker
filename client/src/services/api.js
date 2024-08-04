import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const ENDPOINTS = {
  LOG: "/log",
  LOGS: "/logs",
};

export const createLog = async (logData) => {
  try {
    const response = await api.post(ENDPOINTS.LOG, logData);
    return response.data;
  } catch (error) {
    console.error("Error creating log:", error);
    throw new Error("Failed to create log. Please try again.");
  }
};

export const getLogs = async (email) => {
  try {
    const response = await api.get(`${ENDPOINTS.LOGS}?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw new Error("Failed to fetch logs. Please try again.");
  }
};
