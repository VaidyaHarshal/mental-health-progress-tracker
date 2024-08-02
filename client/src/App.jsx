import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        {user && (
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
