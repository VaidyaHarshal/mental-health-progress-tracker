import React, { useState } from "react";
import axios from "axios";
import { useData } from "../contexts/dataContext"; // Adjust import based on your file structure

const DailyLogForm = ({ user }) => {
  const [form, setForm] = useState({
    mood: "",
    anxiety: "",
    sleep: "",
    activity: "",
    interactions: "",
    symptoms: "",
  });

  const { setLogs } = useData(); // Access context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/log", { ...form, uid: user.uid })
      .then((response) => {
        console.log("Log submitted", response);
        // Update context with new logs
        setLogs((prevLogs) => [...prevLogs, response.data]);
        // Clear form fields
        setForm({
          mood: "",
          anxiety: "",
          sleep: "",
          activity: "",
          interactions: "",
          symptoms: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting log", error);
      });
  };

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
