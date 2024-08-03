import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useData } from "../contexts/dataContext";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
const INITIAL_FORM_STATE = {
  mood: "",
  anxiety: "",
  sleep: "",
  activity: "",
  interactions: "",
  symptoms: "",
};

const DailyLogForm = ({ user }) => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const { setLogs } = useData();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${SOCKET_URL}/api/log`, { ...form, uid: user.uid });
        setForm(INITIAL_FORM_STATE); // Clear form fields
      } catch (error) {
        console.error("Error submitting log", error);
      }
    },
    [form, user.uid]
  );

  useEffect(() => {
    // Connect to the socket.io server
    const socket = io(SOCKET_URL);

    socket.on("logUpdate", (newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [setLogs]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mood:</label>
        <input
          type="text"
          name="mood"
          value={form.mood}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Anxiety Levels:</label>
        <input
          type="text"
          name="anxiety"
          value={form.anxiety}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sleep Patterns:</label>
        <input
          type="text"
          name="sleep"
          value={form.sleep}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Physical Activity:</label>
        <input
          type="text"
          name="activity"
          value={form.activity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Social Interactions:</label>
        <input
          type="text"
          name="interactions"
          value={form.interactions}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Symptoms of Depression or Anxiety:</label>
        <input
          type="text"
          name="symptoms"
          value={form.symptoms}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DailyLogForm;
