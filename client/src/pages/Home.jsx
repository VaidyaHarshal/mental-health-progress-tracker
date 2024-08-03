import React from "react";
import Auth from "../components/Auth";
import { useUser } from "../contexts/userContext";
import DailyLogForm from "../components/DailyLogForm";

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Welcome to the Mental Health Progress Tracker</h2>
      <Auth />
      {user && <DailyLogForm user={user} />}
    </div>
  );
};

export default Home;
