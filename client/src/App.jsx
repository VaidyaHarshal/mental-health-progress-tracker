import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider, useUser } from "./contexts/userContext";
import { DataProvider } from "./contexts/dataContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useUser();

  return (
    <DataProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </DataProvider>
  );
};

export default App;
