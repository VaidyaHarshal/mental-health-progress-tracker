import React from "react";
import Auth from "../components/Auth";

const Home = ({ setUser }) => {
  return (
    <div>
      <h2>Welcome to the Mental Health Progress Tracker</h2>
      <Auth setUser={setUser} />
    </div>
  );
};

export default Home;
