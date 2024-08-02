import React, { useState } from "react";
import DailyLogForm from "./DailyLogForm";
import DataVisualization from "./DataVisualization"; // Your data visualization component

const ParentComponent = () => {
  const [logs, setLogs] = useState([]);

  const handleLogSubmit = (newLog) => {
    setLogs((prevLogs) => [...prevLogs, newLog]); // Add new log to the state
  };

  return (
    <div>
      <DailyLogForm user={{ uid: "user-id" }} onLogSubmit={handleLogSubmit} />
      <DataVisualization logs={logs} />{" "}
      {/* Pass logs to the visualization component */}
    </div>
  );
};

export default ParentComponent;
