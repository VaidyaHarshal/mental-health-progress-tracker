import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DailyLogForm from "./components/DailyLogForm";
import { UserProvider, useUser } from "./contexts/userContext";
import { DataProvider } from "./contexts/dataContext";

const App = () => {
  const { user } = useUser();

  return (
    <DataProvider>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route path="/dailyform" element={<DailyLogForm />} />
          </Routes>
        </Router>
      </UserProvider>
    </DataProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <div>Please sign in to access this page.</div>;
};

export default App;
