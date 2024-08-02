import React from "react";
import DailyLogForm from "../components/DailyLogForm";
import DataVisualization from "../components/DataVisualization";

const Dashboard = ({ user }) => {
  return (
    <div>
      <DailyLogForm user={user} />
      <DataVisualization user={user} />
    </div>
  );
};

export default Dashboard;
