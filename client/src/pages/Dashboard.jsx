import React from "react";
import DailyLogForm from "../components/DailyLogForm";
import DataVisualization from "../components/DataVisualization";
import Auth from "../components/Auth";

const Dashboard = ({ user }) => {
  return (
    <div>
      <Auth />
      <DailyLogForm user={user} />
      <DataVisualization user={user} />
    </div>
  );
};

export default Dashboard;
