import React, { useState } from "react";
import DailyLogForm from "./DailyLogForm";
import DataVisualization from "./DataVisualization";

const ParentComponent = () => {
  const [logs, setLogs] = useState([]);

  return (
    <div>
      <DailyLogForm user={{ uid: "user-id" }} setLogs={setLogs} />
      <DataVisualization logs={logs} />
    </div>
  );
};

export default ParentComponent;
